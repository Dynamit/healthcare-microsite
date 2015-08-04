import React from 'react';

class Layout extends React.Component {

	render() {

		let loadFonts = `
			(function(d) {
			  var tkTimeout=3000;
			  if(window.sessionStorage){if(sessionStorage.getItem('useTypekit')==='false'){tkTimeout=0;}}
			  var config = {
			    kitId: 'omf4gip',
			    scriptTimeout: tkTimeout
			  },
			  h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+"wf-inactive";if(window.sessionStorage){sessionStorage.setItem("useTypekit","false")}},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+="wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
			})(document);
		`;

		return (
			<html>
				<head>
					<title>Hello</title>
					<link rel="stylesheet" href="/assets/styles/main.css" />
					<script src="//use.typekit.net/omf4gip.js"></script>
					<script dangerouslySetInnerHTML={{__html: loadFonts}}></script>
				</head>
				<body dangerouslySetInnerHTML={{__html: this.props.markup}} />
				<script src="/assets/scripts/main.js" async></script>
			</html>
		);
	}
};

export default Layout;
