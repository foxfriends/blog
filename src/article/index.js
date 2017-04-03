'use strict';
import React from 'react';

import BlogLoader from '../loader';
import request from '../request';

class BlogArticle extends React.Component {
  state = { article: null };

  constructor(props) {
    super(props);
    this.loadArticle();
  }

  async loadArticle() {
    const article = await request('article', { id: this.props.article });
    this.setState({ article });
  }

  render() {
    switch(this.state.article) {
      case null:
        return <BlogLoader />
      default:
        return (
          <article>
            { this.state.article.text }
          </article>
        )
    }
  }
}

export default BlogArticle;
