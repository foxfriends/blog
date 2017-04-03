'use strict';
import React from 'react';
import promisify from '../promisify';
import navigator from '../navigator';

class BlogPage extends React.Component {
  state = { page: +this.props.page, more: true };
  setState = promisify(this.setState.bind(this));

  async componentWillReceiveProps(props) {
    if(props.page !== this.state.page) {
      await this.setState({ page: props.page });
      this.props.onPaginate(this.state.page);
    }
  }

  async back() {
    await this.setState({
      page: this.state.page - 1,
      more: true
    });
    navigator.go({ page: this.state.page, search: navigator.get().search });
    this.props.onPaginate(this.state.page);
  }

  async next() {
    await this.setState({ page: this.state.page + 1});
    navigator.go({ page: this.state.page, search: navigator.get().search });
    this.props.onPaginate(this.state.page);
  }

  render() {
    return (
      <nav className="pagination">
        { this.state.page > 1 ? <button className="pagination__button_back" onClick={() => this.back()}>Back</button> : null }
        { this.state.more ? <button className="pagination__button_next" onClick={() => this.next()}>Next</button> : null }
      </nav>
    )
  }
}

export default BlogPage;
