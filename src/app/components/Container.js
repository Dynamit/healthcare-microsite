import React from 'react';
import { RouteHandler, Navigation } from 'react-router';
import Symbol from './Symbol';
import mixin from 'react-mixin';

class Container extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			selectedArticle: 0,
			isReading: false
		};

	}

	render() {

		let articleData =  this.props.data[this.state.selectedArticle] || this.props.data;
		let containerStyle = {
			backgroundImage: `url(/assets/images/${articleData.image})`
		};

		return (
			<div className="container" style={containerStyle}>
				<Symbol id="dynamit-logo" onClick={this._stopReading.bind(this)} />
				<Symbol id="menu" />
				<RouteHandler
					{...this.props}
					selectedArticle={this.state.selectedArticle}
					isReading={this.state.isReading}
					handleSelectArticle={this._selectArticle.bind(this)} />
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
		this.setState({ isReading: true });
	}

};

mixin.onClass(Container, Navigation);

export default Container;
