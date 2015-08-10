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

class App extends React.Component {

	constructor(props) {

		super(props);

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

		this.articleList = [
			'Introduction',
			'2015 September 1',
			'2015 September 10',
			'2015 September 17',
			'2015 October 2'
		]

	}

	static fetchData() {
		return api.get('/article.json');
	}

	_selectArticle(key, e) {
		if (e) { e.preventDefault() }
		this.setState({ selectedArticle: key, isNavigating: false }, () => {
			if (this.state.isReading) {
				this._gotoArticle();
			}
		});
	}

	_stopReading(e) {
		if (e) { e.preventDefault() }
		this.setState({ isReading: false }, () => {
			this.transitionTo('/');
		});
	}

	_startReading() {
		this.setState({ isReading: true });
	}

	_gotoArticle(e) {
		if (e) { e.preventDefault() }
		this.transitionTo(`/article/${this.props.data.meta[this.state.selectedArticle].slug}`);
		this._scrollToTop();
	}

	_gotoPrevArticle(e) {
		if (e) { e.preventDefault() }
		this.transitionTo(`/article/${this.props.data.meta[this.state.selectedArticle].slug}`);
		this._scrollToTop();
	}

	_gotoNextArticle(e) {
		if (e) { e.preventDefault() }
		this.transitionTo(`/article/${this.props.data.meta[this.state.selectedArticle].slug}`);
		this._scrollToTop();
	}

	_scrollToTop() {
		React.findDOMNode(this.refs.Handler).scrollTop = 0;
		window.scrollTo(0,0);
	}

	_toggleMenu(e) {
		if (e) { e.preventDefault() }
		this.setState({
			isNavigating: !this.state.isNavigating,
			hasEngaged: true
		});
	}

	render() {

		let articleData =  this.props.data.meta[this.state.selectedArticle];

		let containerStyle = {
			backgroundImage: `url(/assets/images/${articleData.image})`
		};

		let containerClassNames = classNames('app', {
			'is-navigating': this.state.isNavigating,
			'is-reading': this.state.isReading || this.props.data.article
		});

		let bodyClassNames = classNames('body', {
			'animate-bodyIn': !this.state.isNavigating && this.state.hasEngaged,
			'animate-bodyOut': this.state.isNavigating
		});

		let menuClassNames = classNames({
			'animate-menuIn': this.state.isNavigating,
			'animate-menuOut': !this.state.isNavigating && this.state.hasEngaged
		});

		let bodyCloseHandler = (this.state.isNavigating) ? this._toggleMenu.bind(this) : '';

		return (
			<div className={containerClassNames}>

				<Helmet
					title={this.props.title} />

				<div className={bodyClassNames}
					style={containerStyle}
					onTouchStart={bodyCloseHandler}
					onClick={bodyCloseHandler}>

					<div className="header">
						<div className="lockup" onClick={this._stopReading.bind(this)}>
							<Symbol id="dynamit-logo" />
						</div>
						<div className="menu-toggle" onClick={this._toggleMenu.bind(this)}>
							<span className="menu-toggle-label">More Articles</span>
							<Symbol id="menu-icon" />
						</div>
					</div>

					<div className="article-lead">
						<h1 key={articleData.slug}>
							<a href={`/article/${articleData.slug}/`} onClick={this._gotoArticle.bind(this)}>{articleData.title}</a>
						</h1>
						<p>{articleData.abstract}</p>
						<Button
							href={`/article/${articleData.slug}/`}
							onClick={this._gotoArticle.bind(this)}>Continue Reading</Button>
						<PrevNext
							{...this.props}
							items={this.articleList}
							selectedArticle={this.state.selectedArticle}
							handleSelectArticle={this._selectArticle.bind(this)} />
					</div>

					<RouteHandler
						{...this.props}
						selectedArticle={this.state.selectedArticle}
						isReading={this.state.isReading}
						handleSelectArticle={this._selectArticle.bind(this)}
						handleGotoArticle={this._gotoArticle.bind(this)}
						handleStartReading={this._startReading.bind(this)}
						handleStopReading={this._stopReading.bind(this)} />

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

mixin.onClass(App, Navigation);

App.defaultProps = {
	title: 'Healthcare | Dynamit'
}

export default App;
