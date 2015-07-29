/**
 * Route definition
 * react-router
 */

import React from 'react';
import { Router, DefaultRoute, Route } from 'react-router';
import Container from './components/Container';
import Home from './components/Home';
import Article from './components/Article';


// define routes
const routes = (
	<Route path="/" handler={Container}>
		<DefaultRoute name="home" handler={Home} />
		<Route name="article" path="article/:slug" handler={Article} />
	</Route>
);


export default routes;
