import React from 'react';
import { RouteHandler } from 'react-router';

class Container extends React.Component {
	render () {
		return (
			<div>
				<RouteHandler data={this.props.data} />
			</div>
		);
	}
};

export default Container;
