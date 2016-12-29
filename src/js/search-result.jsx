import React from 'react';

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
  
  
  render() {
    return (
      <div id="search-result">
        <li>{this.state.date.toLocaleString()}</li>
      </div>
    );
  }
}

export default SearchResults;
