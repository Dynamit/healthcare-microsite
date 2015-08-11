/**
 * Previous/Next Article buttons
 */

import React from 'react';
import { sortBy } from 'lodash';
import Button from './Button';

class PrevNext extends React.Component {

	/**
	 * Pass-thru to parent `handleSelectArticle` method
	 * @param  {String} key Article slug/id
	 * @param  {Object} e Event
	 */
	handleSelectArticle(key, e) {
		this.props.handleSelectArticle(key, e);
	}


	render() {

		// sort articles by date
		let articles = sortBy(this.props.data.meta, 'date.raw');

		let currentPosition = 0;
		let totalItems = 0;

		// get some data from the articles
		articles.forEach((article, i) => {

			// get position of selected article
			if (article.slug === this.props.selectedArticle) {
				currentPosition = i;
			}

			// get total number of published items
			if (articles[i]) {
				totalItems++;
			}

		});


		// logic for hiding/showing buttons
		let showPrev = (currentPosition > 0);
		let showNext = (currentPosition + 1 < totalItems);

		let prevButton;
		let nextButton

		if (showPrev) {
			let prevSlug = articles[currentPosition - 1].slug;
			prevButton = <Button href={`/article/${prevSlug}/`} onClick={this.handleSelectArticle.bind(this, prevSlug)} direction="left">Previous Article</Button>;
		}

		if (showNext) {
			let nextSlug = articles[currentPosition + 1].slug
			nextButton = <Button href={`/article/${nextSlug}/`} onClick={this.handleSelectArticle.bind(this, nextSlug)}>Next Article</Button>;
		}


		return (
			<div className="prev-next">
				{prevButton}
				{nextButton}
			</div>
		);
	}

};

export default PrevNext;
