import React from 'react';
import { Link } from 'react-router';
import api from '../api';


class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	static fetchData() {
		return api.get('/article.json');
	}

	render() {

		let articles = this.props.data;
		let selectedArticle = articles[this.props.selectedArticle];

		return (
			<div>
				<div className="article-lede">
					<h1 key={selectedArticle.slug}>
						<Link to="article" params={{ slug: selectedArticle.slug }}>{selectedArticle.title}</Link>
					</h1>
					<p>{selectedArticle.abstract}</p>
					<Link to="article" params={{ slug: selectedArticle.slug }}>Continue Reading</Link>
				</div>
				<ul>
				{this.props.data.map((article, i) => {
					return (
						<li key={article.slug}>
							<a href="#" onClick={this.props.handleSelectArticle.bind(this, i)}>{article.title}</a>
						</li>
					)
				})}
				</ul>
			</div>
		);
	}

};

export default Home;
