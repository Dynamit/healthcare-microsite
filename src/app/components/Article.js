import React from 'react';
import api from '../api';
import Symbol from './Symbol';

class Article extends React.Component {

	static fetchData(params) {
		return api.get(`/article/${params.slug}.json`);
	}

	render () {
		return (
			<div>
				<div className="share-actions">
					<a href="#">
						<Symbol id="linkedin-icon" containerNodeType="a" containerNodeAttrs={{ href: "#" }} />
					</a>
				</div>
				<div className="post-author">
					{this.props.data.author} &bull; {this.props.data.date.formatted}
				</div>
				<div dangerouslySetInnerHTML={{__html: this.props.data.content}} />
			</div>
		);
	}
};

export default Article;
