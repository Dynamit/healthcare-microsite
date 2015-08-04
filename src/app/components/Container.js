import React from 'react';
import { RouteHandler, Navigation } from 'react-router';
import Symbol from './Symbol';
import mixin from 'react-mixin';
import classNames from 'classnames';

class Container extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			selectedArticle: 0,
			isReading: false,
			isNavigating: false
		};

	}

	render() {

		let articleData =  this.props.data[this.state.selectedArticle] || this.props.data;
		let containerStyle = {
			backgroundImage: `url(/assets/images/${articleData.image})`
		};

		let containerClassnames = classNames({
			'container': true,
			'is-navigating': this.state.isNavigating,
			'is-reading': this.state.isReading
		});

		return (
			<div className={containerClassnames} style={containerStyle}>
				<Symbol id="dynamit-logo" onClick={this._stopReading.bind(this)} />
				<Symbol id="menu" onClick={this._toggleMenu.bind(this)} />
				<RouteHandler
					{...this.props}
					selectedArticle={this.state.selectedArticle}
					isReading={this.state.isReading}
					handleSelectArticle={this._selectArticle.bind(this)}
					handleStartReading={this._startReading.bind(this)} />
			</div>
		);
	}

	_selectArticle(index = 0, e) {
		e.preventDefault();
		this.setState({ selectedArticle: index });
	}

	_stopReading(e) {
		e.preventDefault();
		this.setState({ isReading: false }, () => {
			this.transitionTo('/');
		});
	}

	_startReading(e) {
		e.preventDefault();
		this.setState({ isReading: true }, () => {
			this.transitionTo(`/article/${this.props.data[this.state.selectedArticle].slug}`);
		});
	}

	_toggleMenu(e) {
		e.preventDefault();
		this.setState({ isNavigating: !this.state.isNavigating })
	}

};

mixin.onClass(Container, Navigation);

export default Container;
