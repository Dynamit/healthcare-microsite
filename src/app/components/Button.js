/**
 * Button with left/right arrow
 */

import React from 'react';
import Symbol from './Symbol';
import classNames from 'classnames';


class Button extends React.Component {

	render() {

		let buttonClass = classNames({
			button: true,
			'button-left': this.props.direction === 'left',
			'button-right': this.props.direction === 'right'
		}, this.props.className)

		return (
			<a href={this.props.href} onClick={this.props.onClick} className={buttonClass}>
				{this.props.children}
				<Symbol id="arrow-icon" containerNodeType="span" />
			</a>
		);
	}

};

// default props
Button.defaultProps = {
	href: '#',
	direction: 'right',
	onClick: () => {}
};


export default Button;
