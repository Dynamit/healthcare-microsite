/**
 * App entry point (client-side)
 */

import React from 'react';
import Router from 'react-router';
import routes from './Routes';

// for Chrome Dev Tools support
window.React = React;

// dispatch the router
Router.run(routes, Router.HistoryLocation, function (Handler, state) {

	// get the compiled route component
	let routePayload = React.createFactory(Handler)();

	// render route payload
	React.render(routePayload, document.body);

});
