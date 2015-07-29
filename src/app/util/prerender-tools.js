/**
 * utils used during static file generation
 */

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

const destination = 'dist';

let tools = {};

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
 * Write the html to a file
 * @param  {String} dir      Destination directory
 * @param  {String} page     Name of the page
 * @param  {String} contents HTML contents of page
 */
tools.render = function (page, contents) {

	// replace trailing / with 'index.html'
	if (page.match(/\/$/)) {
		page += 'index.html';
	}

	// build a file path
	let filePath = path.join(destination, page);

	// create the directory
	mkdirp.sync(path.dirname(filePath));

	// write the file
	fs.writeFileSync(filePath, contents);

};

export default tools;
