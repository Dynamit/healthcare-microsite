import React from 'react';

class Layout extends React.Component {
	render () {
		return (
			<html>
				<head>
					<title>Hello</title>
				</head>
				<body dangerouslySetInnerHTML={{__html: this.props.markup}} />
			</html>
		);
	}
};

export default Layout;
