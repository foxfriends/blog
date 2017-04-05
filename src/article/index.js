'use strict';
import React from 'react';

import BlogLoader from '../loader';
import request from '../request';
import Markdown from '../markdown';
import TagList from '../tag-list';
import './article.scss';

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
          <article className="article">
            { this.state.article.image
              ? <img className="article__image_header" src={ `/articles/${this.state.article.link}/${this.state.article.image}` } />
              : null }
            <Markdown interpolation={ this.state.article } >
              { this.state.article.text }
            </Markdown>
            <p className="article__taglist">
              <TagList tags={ this.state.article.tags } />
            </p>
          </article>
        )
    }
  }
}

export default BlogArticle;
