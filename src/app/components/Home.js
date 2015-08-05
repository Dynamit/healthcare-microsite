import React from 'react';
import { Link } from 'react-router';
import api from '../api';
import Button from './Button';


class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let articles = this.props.data.meta;
		let selectedArticle = articles[this.props.selectedArticle];

		return (
			<div>
				<div className="article-lead">
					<h1 key={selectedArticle.slug}>
						<a href={`/article/${selectedArticle.slug}/`} onClick={this.props.handleGotoArticle}>{selectedArticle.title}</a>
					</h1>
					<p>{selectedArticle.abstract}</p>
					<Button href={`/article/${selectedArticle.slug}/`} onClick={this.props.handleGotoArticle}>Continue Reading</Button>
				</div>
			</div>
		);
	}

};

export default Home;
