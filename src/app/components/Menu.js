import React from 'react';
import { sortBy } from 'lodash';
import classNames from 'classnames';

class Menu extends React.Component {

	render() {

		let items = this.props.items;
		let articles = sortBy(this.props.articles, 'date.raw');

		return (
			<div className="menu">
				<div className="util-links">
					<a href="#">Get Notified</a>
					<a href="#">Contact</a>
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

						return (
							<li key={i} className={itemClasses} onClick={this.props.handleSelectArticle.bind(this, articles[i].slug)}>
								<div className="menu-item-image" style={{ backgroundImage: `url(/assets/images/${articles[i].thumbnail})` }}></div>
								<div className="menu-item-content">
									<a href={`/article/${articles[i].slug}/`}
										onClick={this.props.handleSelectArticle.bind(this, i)}
										className="menu-item-title">{articles[i].title}</a>
									<div className="menu-item-date">{articles[i].date.formatted}</div>
									<div className="menu-item-placeholder">{item}</div>
								</div>
							</li>
						);

					} else {

						let placeholder = `<div>${item.split(' ')[0]}</div><div>${item.split(' ')[1]}</div>`;

						return (
							<li key={i} className="menu-item is-unpublished">
								<div className="menu-item-placeholder" dangerouslySetInnerHTML={{ __html: placeholder }}></div>
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


