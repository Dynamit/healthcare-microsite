/**
 * Social sharing icons
 */

import React from 'react';
import Symbol from './Symbol';
import Dialog from 'share-dialog';
import ReactZeroClipboard from 'react-zeroclipboard';

class Social extends React.Component {

	constructor(props) {

		super(props);

		/**
		 * Default state
		 * @type {Object}
		 */
		this.state = {
			showClipboard: false,
			copyLabel: 'Copy Link'
		}

	}

	componentDidMount() {
		// get copyLink DOM Node
		this.copyLink = React.findDOMNode(this.refs.copyLink);
	}

	/**
	 * Handle a click on "copy to clipboard" button.
	 * Update state, toggle class (show tooltip for 1 sec.)
	 */
	_handleCopyLink() {
		this.setState({ copyLabel: 'Copied!' }, () => {
			this.copyLink.classList.add('just-copied');
			setTimeout(() => {
				this.copyLink.classList.remove('just-copied');
			}, 1000);
		});
	}

	/**
	 * Show the copy link.
	 * Called only when zeroclipboard (flash) is available.
	 */
	_showCopyLink() {
		this.setState({ showClipboard: true }, () => {
			this.copyLink.classList.add('is-visible');
		});
	}

	/**
	 * Open a share dialog
	 * @param  {Object} dialog ShareDialog instance
	 * @param  {Object} e Event
	 */
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
			<div className="social" aria-label="Social Share Links">
				<ReactZeroClipboard
					text={url}
					onAfterCopy={this._handleCopyLink.bind(this)}
					onReady={this._showCopyLink.bind(this)}>
					<Symbol ref="copyLink" id="link-icon" aria-label={this.state.copyLabel} />
				</ReactZeroClipboard>
				<Symbol href={linkedIn.get()} id="linkedin-icon" onClick={this._openDialog.bind(this, linkedIn)} aria-label="Share on LinkedIn" />
				<Symbol href={twitter.get()} id="twitter-icon" onClick={this._openDialog.bind(this, twitter)} aria-label="Share on Twitter" />
				<Symbol href={facebook.get()} id="facebook-icon" onClick={this._openDialog.bind(this, facebook)} aria-label="Share on Facebook" />
			</div>
		);
	}

};


export default Social;
