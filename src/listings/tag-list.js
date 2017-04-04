'use strict';
import React from 'react';

import navigator from '../navigator';
import './tag-list.scss';

class TagList extends React.Component {
  constructor(...args) {
    super(...args);
  }

  doSearch(query) {
    navigator.go({ search: query, page: 1 });
    return this.props.onClick(query);
  }

  render() {
    return (
      <span className="tag-list">
        { this.props.tags.map((tag, i) => ['/', <span className="tag-list__tag" onClick={event => { event.stopPropagation(); this.doSearch(tag); }} key={`tag-${i}`}>{ tag }</span>]) }
      </span>
    )
  }
}

export default TagList;
