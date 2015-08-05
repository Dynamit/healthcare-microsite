import React from 'react';
import Symbol from './Symbol';

class Social extends React.Component {

	render() {
		return (
			<div className="social">
				<Symbol id="linkedin-icon" />
				<Symbol id="twitter-icon" />
				<Symbol id="facebook-icon" />
				<Symbol id="link-icon" />
			</div>
		);
	}

};

export default Social;
