import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
	render () {
		return (
			<div>
				<h1>Home</h1>
				<Link to="article" params={{ slug: "introduction" }}>Introduction</Link>
			</div>
		);
	}
};

export default Home;
