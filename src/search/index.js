'use strict';
import React from 'react';
import navigator from '../navigator';
import './search.scss';


class BlogSearch extends React.Component {
  state = { query: this.props.query };

  async componentWillReceiveProps(props) {
    if(props.query !== this.state.query) {
      this.setState({ query: props.query });
      this.props.onSearch(props.query);
    }
  }

  updateQuery(event) {
    this.setState({ query: event.target.value });
  }

  async doSearch(event) {
    if(event.key !== 'Enter') return;
    const query = event.target.value;
    navigator.go({ search: query, page: 1 });
    this.props.onSearch(query);
  }

  render() {
    return (
      <div className="search" >
        &gt;<input className="search__input" type="text" value={ this.state.query } onChange={e => this.updateQuery(e)} onKeyPress={e => this.doSearch(e)} placeholder="Search" />
      </div>
    )
  }
}

export default BlogSearch;
