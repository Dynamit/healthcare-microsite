import React from 'react';
import { Link } from 'react-router';
import api from '../api';


class Home extends React.Component {

	static fetchData() {
		return api.get('/article.json');
	}

	render () {
		return (
			<div>
				<h1>Home</h1>
				<ul>
				{this.props.data.map(article => {
					return (
						<li key={article.slug}>
							<Link to="article" params={{ slug: article.slug }}>{article.title}</Link>
						</li>
					)
				})}
				</ul>
			</div>
		);
	}

};

export default Home;
