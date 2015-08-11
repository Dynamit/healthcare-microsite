/**
 * Article view
 */

import React from 'react';
import api from '../api';
import Symbol from './Symbol';
import Social from './Social';
import PrevNext from './PrevNext';
import Button from './Button';
import Helmet from 'react-helmet';


class Article extends React.Component {

	/**
	 * Async call for data
	 * @return {Promise}
	 */
	static fetchData(params) {
		return api.get(`/article/${params.slug}.json`);
	}

	componentDidMount() {
		// start reading once the component mounts
		this.props.handleStartReading();
	}

	render () {

		let article = this.props.data.article;

		return (
			<div className="article">

				<Helmet
					title={`${this.props.data.article.title} | ${this.props.title}`}
					meta={[
						{ name: 'description', content: article.abstract },
						{ name: 'og:description', content: article.abstract },
						{ property: 'og:title', content: article.title },
						{ property: 'og:site_name', content: this.props.title },
						{ property: 'og:type', content: 'article' },
						{ property: 'og:image', content: `${this.props.baseurl}/assets/images/${article.image}` },
						{ property: 'twitter:card', content: 'summary_large_image' },
						{ property: 'twitter:site', content: '@dynamit' },
						{ property: 'twitter:title', content: article.title },
						{ property: 'twitter:description', content: article.abstract },
						{ property: 'twitter:image', content: `${this.props.baseurl}/assets/images/${article.image}` }
					]} />

				<Button href="/" onClick={this.props.handleStopReading} className="hide-button">Hide</Button>

				<Social {...this.props} />

				<div className="measure mt-l pt-l mb">
					<div className="author">
						<img src={`/assets/images/${article.avatar}`} className="author-avatar" />
						<div className="author-details"><span className="author-name">{article.author}</span>&bull;<span className="author-date">{article.date.formatted}</span></div>
					</div>
				</div>

				<div className="article-body measure" dangerouslySetInnerHTML={{__html: article.content}} />

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
