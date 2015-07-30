import React from 'react';

class Article extends React.Component {
	render () {
		return (
			<div>Article: this.props.params.slug</div>
		);
	}
};

export default Article;


// store articles in json files
// make api calls to get data
// data/articles.json
//   article meta data
//   - title
//   - date
//   - abstract
//   - slug
// data/article/<slug>.json
//    same content as article.json (generate that file from these files)
//	  - author
//	  - content
//	  - social meta
//
// Write posts as .md with meta data as front-matter
