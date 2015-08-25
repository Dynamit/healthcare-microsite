/**
 * Main menu
 */

import React from 'react';
import { sortBy } from 'lodash';
import classNames from 'classnames';


class Menu extends React.Component {

	_handleSelectArticle(slug, e) {

		if (e.keyCode && e.keyCode === 13) {
			this.props.handleSelectArticle(slug);
		}

		if (e.type === 'click') {
			this.props.handleSelectArticle(slug, e, true);
		}
	}

	render() {

		let items = this.props.items;
		let articles = sortBy(this.props.articles, 'date.raw');

		let menuClassName = classNames('menu', this.props.className);

		// wrap each line of the placeholder in a div
		let formatPlaceholder = (placeholder, isPublished) => {
			return placeholder.split(' ').map((line, i) => {

				if (!isPublished && i === 0) {
					line = 'Coming';
				}

				return	`<div>${line}</div>`;

			}).join('');
		};

		return (
			<div className={menuClassName} tabIndex="0" role="menu">

				<div className="util-links">
					<a href="http://dynamit.us1.list-manage.com/subscribe?u=a2efcfc6b4b404e84aca37fcd&id=8171c26a8e" target="_blank">Get Notified</a>
					<a href="http://dynamit.com/contact" target="_blank">Contact</a>
				</div>

				<ul className="menu-list">
				{this.props.items.map((item, i) => {

					// iterate through each possible article
					// if an entry exists, show it's data
					// else, show the placeholder
					if (articles[i]) {

						let itemClasses = classNames({
							'menu-item': true,
							'is-selected': (this.props.selectedArticle === articles[i].slug)
						});

						let placeholder = formatPlaceholder(item, true);

						return (
							<li key={i}
								role="menuitem"
								tabIndex="0"
								aria-label={articles[i].title}
								className={itemClasses}
								onClick={this._handleSelectArticle.bind(this, articles[i].slug)}
								onKeyDown={this._handleSelectArticle.bind(this, articles[i].slug)}>
								<div className="menu-item-image" style={{ backgroundImage: `url(/assets/images/${articles[i].thumbnail})` }}></div>
								<div className="menu-item-content">
									<a href={`/article/${articles[i].slug}/`}
										onClick={this._handleSelectArticle.bind(this, articles[i].slug)}
										onKeyDown={this._handleSelectArticle.bind(this, articles[i].slug)}
										className="menu-item-title">{articles[i].title}</a>
									<div className="menu-item-date">{articles[i].date.formatted}</div>
									<div className="menu-item-placeholder" dangerouslySetInnerHTML={{ __html: placeholder }} />
								</div>
							</li>
						);

					} else {

						let placeholder = formatPlaceholder(item, false);

						return (
							<li key={i} className="menu-item is-unpublished">
								<div className="menu-item-placeholder" dangerouslySetInnerHTML={{ __html: placeholder }} />
							</li>
						);

					}
				})}
				</ul>

			</div>
		);
	}

};


export default Menu;
