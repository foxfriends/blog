'use strict';
import React from 'react';

class TagList extends React.Component {
  constructor(...args) {
    super(...args);
  }

  render() {
    return (
      <span>
        { this.props.tags.map((tag, i) => ['/', <a href={`/search/${tag}`} key={`tag-${i}`}>{ tag }</a>]) }
      </span>
    )
  }
}

export default TagList;
