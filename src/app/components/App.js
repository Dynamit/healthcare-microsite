/**
 * Top-level component for the app
 */
import React from 'react';
import { RouteHandler, Navigation } from 'react-router';
import Helmet from 'react-helmet';
import Symbol from './Symbol';
import Button from './Button';
import Menu from './Menu';
import mixin from 'react-mixin';
import classNames from 'classnames';
import api from '../api';
import PrevNext from './PrevNext';

let scroll;

if (typeof window !== 'undefined') {
	scroll = require('scroll');
}


class App extends React.Component {

	constructor(props) {

		super(props);

		/**
		 * Default state
		 * @type {Object}
		 */
		this.state = {
			/**
			 * The `slug` of the currently selected article
			 * @type {String}
			 */
			selectedArticle: (this.props.data.article) ? this.props.data.article.slug : 'introduction',

			/**
			 * Whether or not the user is in reading mode
			 * @type {Boolean}
			 */
			isReading: this.props.isReading,

			/**
			 * Whether or not the (mobile) menu is open
			 * @type {Boolean}
			 */
			isNavigating: false,

			/**
			 * Whether or not the user has engaged the menu. Used to add animation classes.
			 * @type {Boolean}
			 */
			hasEngaged: false
		};

		/**
		 * List of placeholder values "all" articles
		 * @type {Array}
		 */
		this.articleList = [
			'Introduction',
			'2015 September 1',
			'2015 September 10',
			'2015 September 17',
			'2015 October 2'
		]

		this.duration = 500;

	}

	/**
	 * Async call for data
	 * @return {Promise}
	 */
	static fetchData() {
		return api.get('/article.json');
	}

	/**
	 * Set an article as "selected".
	 * Article can be "selected", but not "reading"; user can previewing article.
	 * @param  {String} key Id (same as slug) of the article
	 * @param  {Object} e Event
	 */
	_selectArticle(key, e, animate) {

		if (e) { e.preventDefault() }

		this.setState({ isLoading: animate }, () => {

			let delay = (animate && !this.state.isNavigating) ? this.duration : 0;

			setTimeout(() => {
				this.setState({ selectedArticle: key, isNavigating: false }, () => {
					if (this.state.isReading) {
						this._gotoArticle();
					}
					if (animate) {
						setTimeout(() => {
							this.setState({ isLoading: false })
						}, this.duration);
					}
				});
			}, delay);
		});

	}

	/**
	 * Stop reading. Return to "Home".
	 * @param  {Object} e Event
	 */
	_stopReading(e) {
		if (e) { e.preventDefault() }
		this.setState({ isReading: false }, () => {
			this.transitionTo('/');
		});
	}

	/**
	 * Go into "reading" mode.
	 * Start reading selected article.
	 */
	_startReading() {
		this.setState({ isReading: true });
	}

	/**
	 * Route to the selected article (read from state)
	 * @param  {Object} e Event
	 */
	_gotoArticle(e) {
		if (e) { e.preventDefault() }
		this._scrollToTop().then(() => {
			this.transitionTo(`/article/${this.props.data.meta[this.state.selectedArticle].slug}`);
		});
	}

	/**
	 * Smooth scroll both container and Handler component to top
	 * @return {Promise}
	 */
	_scrollToTop() {

		let scrollApp = new Promise((resolve, reject) => {
			scroll.top(React.findDOMNode(this.refs.App), 0, resolve);
		});

		let scrollHandler = new Promise((resolve, reject) => {
			scroll.top(React.findDOMNode(this.refs.Handler), 0, resolve);
		});

		return new Promise((resolve, reject) => {
			Promise.all([scrollApp, scrollHandler]).then(resolve);
		});

	}

	/**
	 * Toggle open/close the menu.
	 * Indicate that the app has been engaged (used to apply animations)
	 * @param  {Object} e Event
	 */
	_toggleMenu(e) {
		if (e) { e.preventDefault() }
		this.setState({
			isNavigating: !this.state.isNavigating,
			hasEngaged: true
		});
	}


	render() {

		// data for selected article
		let selectedArticleData =  this.props.data.meta[this.state.selectedArticle];

		// conditional classes
		let containerClassNames = classNames('app', {
			'is-navigating': this.state.isNavigating,
			'is-reading': this.state.isReading || this.props.data.article
		});

		let bodyClassNames = classNames('body', {
			'animate-bodyIn': !this.state.isNavigating && this.state.hasEngaged,
			'animate-bodyOut': this.state.isNavigating,
			'animate-articleIn': this.state.isReading || this.props.data.article,
			'animate-articleOut': !this.state.isReading,
			'is-loading': this.state.isLoading
		});

		let menuClassNames = classNames({
			'animate-menuIn': this.state.isNavigating,
			'animate-menuOut': !this.state.isNavigating && this.state.hasEngaged
		});

		// if menu is open, make a click/touch on the `body` close the menu
		let bodyCloseHandler = (this.state.isNavigating) ? this._toggleMenu.bind(this) : '';

		return (
			<div ref="App" className={containerClassNames}>

				<Helmet
					title={this.props.title}
					meta={[
						{ name: 'description', content: this.props.description },
						{ name: 'og:description', content: this.props.description },
						{ property: 'og:title', content: this.props.title },
						{ property: 'og:type', content: 'article' },
						{ property: 'og:image', content: `${this.props.baseurl}/assets/images/${selectedArticleData.image}` },
						{ property: 'twitter:card', content: 'summary_large_image' },
						{ property: 'twitter:site', content: '@dynamit' },
						{ property: 'twitter:title', content: this.props.title },
						{ property: 'twitter:description', content: this.props.description },
						{ property: 'twitter:image', content: `${this.props.baseurl}/assets/images/${selectedArticleData.image}` }
					]} />

				<div className={bodyClassNames}
					onTouchStart={bodyCloseHandler}
					onClick={bodyCloseHandler}>

					<div className="poster">
						<img src={`/assets/images/${selectedArticleData.image}`} />
						<div className="article-lead">
							<h1 key={selectedArticleData.slug}>
								<a href={`/article/${selectedArticleData.slug}/`} onClick={this._gotoArticle.bind(this)}>{selectedArticleData.title}</a>
							</h1>
							<p>{selectedArticleData.abstract}</p>
							<Button
								href={`/article/${selectedArticleData.slug}/`}
								onClick={this._gotoArticle.bind(this)}>Continue Reading</Button>
							<PrevNext
								{...this.props}
								items={this.articleList}
								selectedArticle={this.state.selectedArticle}
								handleSelectArticle={this._selectArticle.bind(this)} />
						</div>
					</div>

					<div className="header">
						<div className="lockup" onClick={this._stopReading.bind(this)}>
							<Symbol id="dynamit-logo" />
						</div>
						<div className="menu-toggle" onClick={this._toggleMenu.bind(this)}>
							<span className="menu-toggle-label">More Articles</span>
							<Symbol id="menu-icon" />
						</div>
					</div>



					<div className="handler">
						<RouteHandler
							ref="Handler"
							{...this.props}
							selectedArticle={this.state.selectedArticle}
							isReading={this.state.isReading}
							handleSelectArticle={this._selectArticle.bind(this)}
							handleGotoArticle={this._gotoArticle.bind(this)}
							handleStartReading={this._startReading.bind(this)}
							handleStopReading={this._stopReading.bind(this)} />
					</div>

				</div>

				<Menu
					className={menuClassNames}
					items={this.articleList}
					selectedArticle={this.state.selectedArticle}
					articles={this.props.data.meta}
					handleSelectArticle={this._selectArticle.bind(this)} />

			</div>
		);
	}

};


// mixin Navigation from react-router
mixin.onClass(App, Navigation);


// default props
App.defaultProps = {
	title: 'Healthcare | Dynamit',
	description: 'Digital ideas for shaping the healthcare consumer experience in the areas of relationships, access, communication, and adoption.',
	baseurl: 'http://healthcare.dynamit.com'
}

export default App;
