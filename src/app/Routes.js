/**
 * Route definition
 * react-router
 */

import React from 'react';
import { Router, DefaultRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Article from './components/Article';


// define routes
const routes = (
	<Route path="/" handler={App}>
		<DefaultRoute name="home" handler={Home} />
		<Route name="article" path="article/:slug/?" handler={Article} />
	</Route>
);


export default routes;
