import React from 'react';

class Article extends React.Component {
	render () {
		return (
			<div>Article: {this.props.params.slug}</div>
		);
	}
};

export default Article;
