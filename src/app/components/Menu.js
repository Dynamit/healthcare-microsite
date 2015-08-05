import React from 'react';
import { sortBy } from 'lodash';

class Menu extends React.Component {

	render() {

		let items = this.props.items;
		let articles = sortBy(this.props.articles, 'date.raw');

		return (
			<ul className="menu">
			{this.props.items.map((item, i) => {
				// iterate through each possible article
				// if an entry exists, show it's data
				// else, show the placeholder
				if (articles[i]) {
					return (
						<li key={i} className="menu-item" onClick={this.props.handleSelectArticle.bind(this, articles[i].slug)}>
							<div className="menu-item-image"></div>
							<a href={`/article/${articles[i].slug}/`}
								onClick={this.props.handleSelectArticle.bind(this, i)}
								className="menu-item-title">{articles[i].title}</a>
							<div className="menu-item-date">date</div>
							<div className="menu-item-placeholder">{item}</div>
						</li>
					);
				} else {
					return (
						<li key={i} className="menu-item menu-item-unpublished">
							{item}
						</li>
					);
				}
			})}
			</ul>
		);
	}

};

export default Menu;


