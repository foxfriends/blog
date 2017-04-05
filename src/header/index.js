'use strict';
import React from 'react';
import './header.scss';

class BlogHeader extends React.Component {
  render() {
    return (
      <header className="page__header">
        <h1 className="page__header_title"><a href="/">Crabs ate the sky</a></h1>
        <p className="page__header_subtitle">in which I make code pretty, among other things</p>
      </header>
    )
  }
}

export default BlogHeader;
