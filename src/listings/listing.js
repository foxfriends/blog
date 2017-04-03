'use strict';
import React from 'react';

import TagList from './tag-list';

import './listing.scss';

class Listing extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <div className="listing" onClick={() => this.props.onClick( this.props.article.id )}>
        { this.props.highlight && this.props.article.image ? <img src={ this.props.article.image } className="listing__image"/> : null }
        <div className="listing__content">
          <span className="listing__content_title">{ this.props.article.title }</span>
          <span className="listing__content_subtitle">{ this.props.article.subtitle }</span>
          <span className="listing__content_date">{ this.props.article.date }</span>
          <span className="listing__content_tags"><TagList tags={ this.props.article.tags } /></span>
        </div>
      </div>
    )
  }
}

export default Listing;
