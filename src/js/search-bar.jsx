import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      requestData: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const request = new XMLHttpRequest();
    
    event.preventDefault();
    
    request.addEventListener('load', function(data) {
      console.log(data.currentTarget.response);
      this.setState({requestData: data.currentTarget.response});
    });
    request.open('GET', 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + this.state.value);
    request.send();
  }
  
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div id="search">
        <div className="search-container">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="main-search"></label>
            <input id="main-search" type="search" name="main-search" placeholder="Search for Swedish cities..." autoComplete="off" onKeyUp={this.handleChange} />
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
