/**
 * Interrogate routes and generate static HTML files
 */

// shim jsx and es6 importing
import * as jsx from 'node-jsx';
jsx.install({ extension: '.jsx' });

import React from 'react';
import Router from 'react-router';
import routes from '../../src/app/Routes';
import tools from './prerender-tools';
import Layout from '../../src/app/components/Layout';
import fs from 'fs';

// get article meta data
const articles = JSON.parse(fs.readFileSync('./dist/data/article.json', 'utf-8'));


export default () => {

	// get shared HTML layout
	const layout = React.createFactory(Layout);

	// get an array of routes
	let pages = tools.gatherRoutes(routes);

	// interpolate article views to replace :slug with real slug
	pages = tools.interpolate(pages, '/article/:slug', articles);

	// render each page
	pages.forEach(page => {

		// match routes
		Router.run(routes, page, (Handler, state) => {

			// get the compiled route component
			let routePayload = React.createFactory(Handler)();

			// wrap the route payload in the Layout; render
			let html = React.renderToStaticMarkup(layout({
				markup: React.renderToString(routePayload)
			}));

			tools.render(page, html);

		});

	});

}
