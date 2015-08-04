import React from 'react';
import { RouteHandler } from 'react-router';
import Symbol from './Symbol';

class Container extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedArticle: 0,
			isReading: false
		}
	}

	render() {
		return (
			<div>
				<Symbol id="dynamit-logo" />
				<Symbol id="menu" />
				<RouteHandler
					{...this.props}
					selectedArticle={this.state.selectedArticle}
					isReading={this.state.isReading}
					handleSelectArticle={this._selectArticle.bind(this)} />
			</div>
		);
	}

	_selectArticle(index) {
		this.setState({ selectedArticle: index });
	}
};

export default Container;
