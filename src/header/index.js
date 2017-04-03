'use strict';
import React from 'react';
import './header.scss';

class BlogHeader extends React.Component {
  render() {
    return (
      <header className="page__header">
        <h1 className="page__header_title"><a href="/">Header</a></h1>
      </header>
    )
  }
}

export default BlogHeader;
