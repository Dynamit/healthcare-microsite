import React from 'react';
import api from '../api';
import Symbol from './Symbol';
import Social from './Social';
import PrevNext from './PrevNext';

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
				<Social />
				<div className="author">
					<img src={`/assets/images/${article.avatar}`} className="author-avatar" />
					<div className="author-details"><span className="author-name">{article.author}</span>&bull;<span className="author-date">{article.date.formatted}</span></div>
				</div>
				<div className="article-body" dangerouslySetInnerHTML={{__html: article.content}} />
				<PrevNext
					{...this.props}
					items={this.articleList}
					selectedArticle={this.props.selectedArticle}
					handleSelectArticle={this.props.handleSelectArticle.bind(this)} />
			</div>
		);
	}
};

export default Article;
