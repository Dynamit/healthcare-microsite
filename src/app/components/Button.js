import React from 'react';
import api from '../api';
import Symbol from './Symbol';
import classNames from 'classnames';

class Button extends React.Component {

	render() {

		let buttonClass = classNames({
			button: true,
			'button-left': this.props.direction === 'left',
			'button-right': this.props.direction === 'right'
		})

		return (
			<a href={this.props.href} onClick={this.props.onClick} className={buttonClass}>
				{this.props.children}
				<Symbol id="arrow-icon" />
			</a>
		);
	}

};

Button.defaultProps = {
	href: '#',
	direction: 'right',
	onClick: () => {}
};


export default Button;
