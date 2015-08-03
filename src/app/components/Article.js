import React from 'react';
import api from '../api';

class Article extends React.Component {

	static fetchData(params) {
		return api.get(`/article/${params.slug}.json`);
	}

	render () {
		return (
			<div>
				Article: {this.props.data.title}
				<div dangerouslySetInnerHTML={{__html: this.props.data.content}} />
			</div>
		);
	}
};

export default Article;
