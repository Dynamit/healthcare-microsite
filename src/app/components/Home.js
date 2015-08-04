import React from 'react';
import { Link } from 'react-router';
import api from '../api';


class Home extends React.Component {

	constructor(props) {
		super(props);
		this.articleList = [
			'Introduction',
			'September 1',
			'September 10',
			'September 17',
			'October 2'
		]
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
				<ul className="article-menu">
				{this.articleList.map((item, i) => {
					// iterate through each possible article
					// if an entry exists, show it's data
					// else, show the placeholder
					if (articles[i]) {
						return (
							<li key={i}>
								<a href={`/article/${articles[i].slug}/`} onClick={this.props.handleSelectArticle.bind(this, i)}>{articles[i].title}</a>
							</li>
						);
					} else {
						return (
							<li key={i}>
								{item}
							</li>
						);
					}

				})}
				</ul>
			</div>
		);
	}

};

export default Home;
