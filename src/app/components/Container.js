import React from 'react';
import { RouteHandler, Navigation } from 'react-router';
import Symbol from './Symbol';
import Button from './Button';
import Menu from './Menu';
import mixin from 'react-mixin';
import classNames from 'classnames';
import api from '../api';
import PrevNext from './PrevNext';

class Container extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			selectedArticle: (this.props.data.article) ? this.props.data.article.slug : 'introduction',
			isReading: this.props.isReading,
			isNavigating: false
		};

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
	}

	_gotoPrevArticle(e) {
		if (e) { e.preventDefault() }
		this.transitionTo(`/article/${this.props.data.meta[this.state.selectedArticle].slug}`);
	}

	_gotoNextArticle(e) {
		if (e) { e.preventDefault() }
		this.transitionTo(`/article/${this.props.data.meta[this.state.selectedArticle].slug}`);
	}

	_toggleMenu(e) {
		if (e) { e.preventDefault() }
		this.setState({ isNavigating: !this.state.isNavigating })
	}

	render() {

		let articleData =  this.props.data.meta[this.state.selectedArticle];
		let containerStyle = {
			backgroundImage: `url(/assets/images/${articleData.image})`
		};

		let containerClassnames = classNames({
			'container': true,
			'is-navigating': this.state.isNavigating,
			'is-reading': this.state.isReading
		});

		let bodyCloseHandler = (this.state.isNavigating) ? this._toggleMenu.bind(this) : '';

		return (
			<div className={containerClassnames}>

				<div className="body" style={containerStyle} onTouchStart={bodyCloseHandler} onClick={bodyCloseHandler}>

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
						<div className="article-lead-inner">
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
					items={this.articleList}
					selectedArticle={this.state.selectedArticle}
					articles={this.props.data.meta}
					handleSelectArticle={this._selectArticle.bind(this)} />

			</div>
		);
	}

};

mixin.onClass(Container, Navigation);

export default Container;
