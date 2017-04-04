'use strict';
import React from 'react';
import './loader.scss';

class BlogLoader extends React.Component {
  text = 'Loading...';
  state = { text: '' };
  handler = null;
  time = 0;

  nextLetter(time) {
    if(time - this.time > 1000 / 20) {
      this.setState({ text: this.text.substr(0, this.state.text.length + 1) });
      this.time = time;
    }
    this.handler = window.requestAnimationFrame(this.nextLetter.bind(this));
  }

  componentDidMount() {
    this.handler = window.requestAnimationFrame(this.nextLetter.bind(this));
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.handler);
  }

  render() {
    return <div className="loader">&gt; { this.state.text }</div>
  }
}

export default BlogLoader;
