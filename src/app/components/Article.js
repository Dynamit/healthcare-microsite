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


	/**
	 * Close article when pressing `ESC` or `BACKSPACE`
	 */
	_closeArticle(e) {
		var keys = [27, 8];
		if (keys.indexOf(e.which) > -1) {
			e.preventDefault();
			this.props.handleStopReading();
		}
	}

	componentDidMount() {

		// start reading once the component mounts
		this.props.handleStartReading();

		// add event listener for keyboard
		document.addEventListener('keydown', this._closeArticle.bind(this));

	}

	componentWillUnmount() {
		// remove keyboard listener
		document.removeEventListener('keydown', this._closeArticle.bind(this))
	}

	componentDidUpdate() {
		let target = React.findDOMNode(this.refs.Article);
		setTimeout(() => {
			target.focus();
		}, this.props.duration)
	}

	render () {

		let article = this.props.data.article;

		return (
			<div className="article" role="article" ref="Article" tabIndex="0">

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

				<div className="article-body measure">
					<div className="mt-l pt-l mb" aria-label="Article Author">
						<div className="author">
							<img src={`/assets/images/${article.avatar}`} className="author-avatar" alt={article.author} />
							<div className="author-details"><span className="author-name">{article.author}</span>&bull;<span className="author-date">{article.date.formatted}</span></div>
						</div>
					</div>
					<div tabIndex="0" aria-label="Article Body" dangerouslySetInnerHTML={{__html: article.content}} />
					<PrevNext
						{...this.props}
						items={this.articleList}
						selectedArticle={this.props.selectedArticle}
						handleSelectArticle={this.props.handleSelectArticle.bind(this)} />
				</div>

			</div>
		);
	}
};

export default Article;
