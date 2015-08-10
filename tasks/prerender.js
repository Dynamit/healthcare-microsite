/**
 * Interrogate routes and generate static HTML files
 */

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import React from 'react';
import Router from 'react-router';
import routes from '../src/app/Routes';
import Layout from '../src/app/components/Layout';
import Helmet from 'react-helmet';
import Hapi from 'hapi';


const destination = 'dist';
const tools = {};
const server = new Hapi.Server();


// configure server
server.connection({
	host: 'localhost',
	port: 8081,
	routes: {
		cors: true
	}
});


// serve static content
server.route({
	method: 'GET',
	path: '/{path*}',
	handler: {
		directory: {
			path: destination,
			listing: false,
			index: true
		}
	}
});



/**
 * Turn react-router routes into an array of strings
 * @param  {Object} routes     react-router routes
 * @param  {String} parentPath optional path used to recurse path
 * @return {Array}
 */
tools.gatherRoutes = function (routes, parentPath) {

	let result = [];

	// check to see if routes is an array
	routes = Array.isArray(routes) ? routes : [routes];

	// iterate over routs
	routes.forEach(function (route) {

		// get route props
		let props = route._store.props;

		// get route path
		let routePath = props.path;

		if (routePath) {
			// join parent path with route path
			routePath = (parentPath) ? path.join(parentPath, routePath) : routePath;

			// save
			result.push(routePath);
		}

		// recurse
		if (props.children) {
			result = result.concat(this.gatherRoutes(props.children, routePath));
		}

	}.bind(this));

	return result

};


/**
 * [interpolate description]
 * @return {[type]} [description]
 */
tools.interpolate = function (paths, forPath, values) {

	let interpolated = [];

	paths.forEach(p => {

		// remove trailing '/?' from route path
		p = p.replace(/\/\?$/, '');

		if (p === forPath) {
			Object.keys(values).forEach(value => {
				interpolated.push(p.replace(path.basename(p), values[value].slug));
			});
		} else {
			interpolated.push(p);
		}

	});

	return interpolated;

};


/**
 * Write the html to a file
 * @param  {String} dir      Destination directory
 * @param  {String} page     Name of the page
 * @param  {String} contents HTML contents of page
 */
tools.render = function (page, contents) {

	// render views to <page>/index.html
	page = page + '/index.html';

	// build a file path
	let filePath = path.join(destination, page);

	// create the directory
	mkdirp.sync(path.dirname(filePath));

	// write the file
	fs.writeFileSync(filePath, contents);

};



/**
 * Build routes, dispatch router, render
 * @param  {Object} opts Options
 */
export default (opts) => {

	// get shared HTML layout
	const layout = React.createFactory(Layout);

	// get an array of routes
	let pages = tools.gatherRoutes(routes);

	// interpolate article views to replace :slug with real slug
	pages = tools.interpolate(pages, '/article/:slug', opts.data.article);

	// parse a page, resolve promise when done
	let parsePage = (page, resolve) => {

		// run router against `page`
		Router.run(routes, page, (Handler, state) => {

			// some routes depend on async data (from an API)
			// use promises to wait for data, then render views
			// `fetchData` is a static method used to get a route's data

			// get all promises for route component tree
			let promises = state.routes.filter(route => {
				// find routes with `fetchData` method
				return route.handler.fetchData;
			}).map(route => {
				// return the promise
				return route.handler.fetchData(state.params);
			});

			// listen for resolutions, then render views
			Promise.all(promises).then(data  => {

				try {

					// get the compiled route component
					let routePayload = React.createElement(Handler, { data: { meta: data[0], article: data[1] } });

					// render component to string
					let markup = React.renderToString(routePayload);

					// get react-helmet props
					let head = Helmet.rewind();

					// wrap the route payload in the Layout; render
					let html = React.renderToStaticMarkup(layout({
						markup: markup,
						head: head
					}));

					// render route payload
					tools.render(page, html);

					// resolve the promise
					resolve();

				} catch(e) {
					console.error(e.stack);
					process.exit();
					reject();
				}

			});

		});

	};


	// return a promise that waits on all pages to be rendered before resolving
	return new Promise((resolve, reject) => {

		// start server
		// parse pages
		// stop server
		// resolve
		server.start(function() {

			// iterate over pages, return a promise for each page
			// so we can make async calls to data sources
			let pagePromises = pages.map(page => {
				return new Promise((resolve, reject) => {
					parsePage(page, resolve);
				});
			});

			// wait for all pages to finish rendering, then stop server and resolve the entire task
			Promise.all(pagePromises).then(() => {
				server.stop(resolve);
			});

		});

	});

}
