'use strict';
import React from 'react';

import TagList from '../tag-list';

import './listing.scss';

class Listing extends React.Component {
  constructor(...args) {
    super(...args);
  }

  tagSearch(query) {
    this.props.onTagClick(query);
    return false;
  }

  render() {
    return (
      <div className="listing" onClick={() => this.props.onClick( this.props.article.link )}>
        { this.props.highlight && this.props.article.image ? <img src={ `/articles/${this.props.article.link}/${this.props.article.image}` } className="listing__image"/> : null }
        <div className="listing__content">
          <span className="listing__content_title">{ this.props.article.title }</span>
          <span className="listing__content_subtitle">{ this.props.article.subtitle }</span>
          <span className="listing__content_date">{ this.props.article.date }</span>
          <span className="listing__content_tags"><TagList tags={ this.props.article.tags } onClick={query => this.tagSearch(query)}/></span>
        </div>
      </div>
    )
  }
}

export default Listing;
