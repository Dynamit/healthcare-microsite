/**
 * Master layout
 * @description Layout wrapper. Used only in prerender. Client-side app renders on `document.body`
 */
import React from 'react';

class Layout extends React.Component {

	constructor(props) {

		super(props);

		this.loadFonts = `try{Typekit.load({ async: true });}catch(e){}`;

	}

	_helmetToComponent(str) {

		// stop if str is empty
		if (!str.length) {
			return;
		}

		// an array of React components
		let Components = [];

		// react-helmet returns a line-break delimited list of tags
		// split so we can deal with each individually
		str.split(/\n/).forEach((node, i) => {

			// extrapolate node type
			let nodeType = str.match(/[a-z]+/)[0];

			// container for props
			let props = {
				key: i
			};

			// match attr="value" pattern
			// store props
			node.match(/([a-z\-]+=".*?")/g).forEach((attr) => {
				let matches = attr.match(/([a-z\-]+)="(.*?)"/);
				props[matches[1]] = matches[2];
			});

			// create and save the component
			Components.push(React.createElement(nodeType, props));

		});

		// return the array of components
		return Components;

	}

	render() {

		let meta = this._helmetToComponent(this.props.head.meta);
		let link = this._helmetToComponent(this.props.head.link);

		return (
			<html lang="en">
				<head>
					<title>{this.props.head.title}</title>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					{meta}
					<link rel="stylesheet" href="/assets/styles/main.css" />
					{link}
					<script src="http://use.typekit.net/omf4gip.js"></script>
					<script dangerouslySetInnerHTML={{__html: this.loadFonts}}></script>
				</head>
				<body dangerouslySetInnerHTML={{ __html: this.props.markup }} />
				<script src="/assets/scripts/main.js" async></script>
			</html>
		);
	}
};

export default Layout;
