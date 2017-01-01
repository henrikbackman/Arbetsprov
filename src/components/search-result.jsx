import React from 'react';
import moment from 'moment';
import SearchItem from './search-item';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: moment().format('YYYY-MM-DD HH:mm')};
  }

  deleteItem(id) {
    this.props.onDelete(id);
  }

  render() {
    let queryItems;
    if (this.props.queries.length) {
      queryItems = this.props.queries.map(query => {
        return (
          <SearchItem key={query.id} query={query} date={this.state.date} onDelete={this.deleteItem.bind(this)} />
        );
      });
    }

    return (
      <ul>
        {queryItems}
      </ul>
    );
  }
}

SearchResults.propTypes = {
  queries: React.PropTypes.array,
  key: React.PropTypes.string,
  query: React.PropTypes.string,
  date: React.PropTypes.string,
  onDelete: React.PropTypes.func
}

export default SearchResults;
