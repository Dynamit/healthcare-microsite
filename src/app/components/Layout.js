import React from 'react';

class Layout extends React.Component {
	render () {
		return (
			<html>
				<head>
					<title>Hello</title>
					<link rel="stylesheet" href="/assets/styles/main.css" />
				</head>
				<body dangerouslySetInnerHTML={{__html: this.props.markup}} />
				<script src="/assets/scripts/main.js" async></script>
			</html>
		);
	}
};

export default Layout;
