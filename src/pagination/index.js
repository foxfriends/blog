'use strict';
import React from 'react';
import promisify from '../promisify';
import navigator from '../navigator';
import './pagination.scss';

class BlogPagination extends React.Component {
  state = { page: +this.props.page, last: +this.props.last };
  setState = promisify(this.setState.bind(this));

  async componentWillReceiveProps(props) {
    this.setState({ last: props.last });
    if(props.page !== this.state.page) {
      await this.setState({ page: props.page });
      this.props.onPaginate(this.state.page);
    }
  }

  async back(n = 1) {
    await this.setState({ page: this.state.page - n });
    navigator.go({ page: this.state.page, search: navigator.get().search });
    this.props.onPaginate(this.state.page);
  }

  async next(n = 1) {
    await this.setState({ page: this.state.page + n });
    navigator.go({ page: this.state.page, search: navigator.get().search });
    this.props.onPaginate(this.state.page);
  }

  render() {
    return (
      <nav className="pagination">
        <button className={`pagination__button pagination__button_back ${this.state.page <= 1 ? 'pagination__button_fake' : ''}`} onClick={() => this.back()}>⟵</button>
        { this.state.page - 2 >= 1 ? <button className="pagination__button pagination__button_page" onClick={() => this.back(2)}>{ this.state.page - 2 }</button> : null }
        { this.state.page - 1 >= 1 ? <button className="pagination__button pagination__button_page" onClick={() => this.back(1)}>{ this.state.page - 1 }</button> : null }
        <button className="pagination__button pagination__button_page pagination__button_fake">{ this.state.page }</button>
        { this.state.page + 1 <= this.state.last ? <button className="pagination__button pagination__button_page" onClick={() => this.next(1)}>{ this.state.page + 1 }</button> : null }
        { this.state.page + 2 <= this.state.last ? <button className="pagination__button pagination__button_page" onClick={() => this.next(2)}>{ this.state.page + 2 }</button> : null }
        <button className={`pagination__button pagination__button_next ${this.state.page > this.state.last - 1 ? 'pagination__button_fake' : ''}`} onClick={() => this.next()}>⟶</button>
      </nav>
    )
  }
}

export default BlogPagination;
