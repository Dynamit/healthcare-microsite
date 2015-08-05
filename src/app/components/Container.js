import React from 'react';
import { RouteHandler, Navigation } from 'react-router';
import Symbol from './Symbol';
import Menu from './Menu';
import mixin from 'react-mixin';
import classNames from 'classnames';
import api from '../api';

class Container extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			selectedArticle: 'introduction',
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

		return (
			<div className={containerClassnames}>
				<div className="body" style={containerStyle}>
					<div className="header">
						<Symbol id="dynamit-logo" onClick={this._stopReading.bind(this)} />
						<Symbol id="menu-icon" onClick={this._toggleMenu.bind(this)} />
					</div>
					<RouteHandler
						{...this.props}
						selectedArticle={this.state.selectedArticle}
						isReading={this.state.isReading}
						handleStartReading={this._startReading.bind(this)}
						handleGotoArticle={this._gotoArticle.bind(this)} />
				</div>
				<Menu
					items={this.articleList}
					articles={this.props.data.meta}
					handleSelectArticle={this._selectArticle.bind(this)} />
			</div>
		);
	}

	_selectArticle(key, e) {
		if (e) { e.preventDefault() }
		this.setState({ selectedArticle: key, isNavigating: false }, () => {
			this._gotoArticle(null);
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

	_toggleMenu(e) {
		if (e) { e.preventDefault() }
		this.setState({ isNavigating: !this.state.isNavigating })
	}

};

mixin.onClass(Container, Navigation);

export default Container;
