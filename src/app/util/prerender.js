/**
 * Interrogate routes and generate static HTML files
 */

// shim jsx and es6 importing
import * as jsx from 'node-jsx';
jsx.install({ extension: '.jsx' });

import React from 'react';
import Router from 'react-router';
import routes from '../Routes';
import tools from './prerender-tools';
import Layout from '../components/Layout';

export default () => {

	// get shared HTML layout
	const layout = React.createFactory(Layout);

	// get an array of routes
	let pages = tools.gatherRoutes(routes);

	// TODO interpolate article views to replace :slug with real slug
	// TODO create mechanism to respect slugs/context-specic views

	// render each page
	pages.forEach(function (page) {

		// match routes
		Router.run(routes, page, function (Handler, state) {

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
