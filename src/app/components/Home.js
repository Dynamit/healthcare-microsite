import React from 'react';
import { Link } from 'react-router';
import api from '../api';


class Home extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		let articles = this.props.data.meta;
		let selectedArticle = articles[this.props.selectedArticle];

		return (
			<div />
		);
	}

};

export default Home;
