import React from 'react';
import Symbol from './Symbol';
import Dialog from 'share-dialog';
import ReactZeroClipboard from 'react-zeroclipboard';

class Social extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			showClipboard: false,
			copyLabel: 'Copy Link'
		}

	}

	componentDidMount() {
		this.node = React.findDOMNode(this.refs.copyLink);
	}

	_handleCopyLink() {
		this.setState({ copyLabel: 'Copied!' }, () => {
			this.node.classList.add('just-copied');
			setTimeout(() => {
				this.node.classList.remove('just-copied');
			}, 1000);
		});
	}

	_showCopyLink() {
		this.setState({ showClipboard: true }, () => {
			this.node.classList.add('is-visible');
		});
	}

	_openDialog(dialog, e) {
		e.preventDefault();
		dialog.open();
	}

	render() {

		let url = `${this.props.baseurl}/article/${this.props.data.article.slug}`;
		let seed = this.props.data.article.title;

		let linkedIn = Dialog.linkedIn(url);
		let twitter = Dialog.twitter(url, seed);
		let facebook = Dialog.facebook(url);

		return (
			<div className="social">
				<ReactZeroClipboard
					text={url}
					onAfterCopy={this._handleCopyLink.bind(this)}
					onReady={this._showCopyLink.bind(this)}>
					<Symbol ref="copyLink" id="link-icon" aria-label={this.state.copyLabel} />
				</ReactZeroClipboard>
				<Symbol id="linkedin-icon" onClick={this._openDialog.bind(this, linkedIn)} />
				<Symbol href={twitter.get()} id="twitter-icon" onClick={this._openDialog.bind(this, twitter)} />
				<Symbol href={facebook.get()} id="facebook-icon" onClick={this._openDialog.bind(this, facebook)} />
			</div>
		);
	}

};


export default Social;
