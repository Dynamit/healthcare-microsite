import React from 'react';
import api from '../api';
import Symbol from './Symbol';

class Article extends React.Component {

	static fetchData(params) {
		return api.get(`/article/${params.slug}.json`);
	}

	componentDidMount() {
		this.props.handleStartReading()
	}

	render () {

		let article = this.props.data.article;

		return (
			<div className="article">
				<div className="share-actions">
					<a href="#">
						<Symbol id="linkedin-icon" containerNodeType="a" containerNodeAttrs={{ href: "#" }} />
					</a>
				</div>
				<div className="post-author">
					{article.author} &bull; {article.date.formatted}
				</div>
				<div dangerouslySetInnerHTML={{__html: article.content}} />
			</div>
		);
	}
};

export default Article;
