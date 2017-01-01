import React, { Component } from 'react';
import uuid from 'uuid';
import $ from 'jquery';
import SearchBar from './components/search-bar';
import SearchResults from './components/search-result';

class App extends Component {
  constructor() {
    super();

    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleError = this.handleError.bind(this);

    this.state = {
      queries: []
    }
  }

  handleAddItem(query) {
    $.ajax({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + query.value,
      dataType: 'json',
      cache: false,
      success: function(data) {
        if (data.status === 'ZERO_RESULTS') {
          this.handleError(query.value, '¯\\_(ツ)_/¯');
          return;
        }

        let currQueryState = this.state.queries,
            newQuery,
            locationData = [],
            subInfo = '',
            city = '',
            addressComp = data.results[0].address_components;

        // Logic for the Google Maps JSON structure
        for (var i = 0; i < addressComp.length; i++) {
          let type = addressComp[i].types[0],
              name = addressComp[i].long_name;

          if (type === 'political') {
            locationData.sublocality = name;
          } else if (type === 'locality') {
            locationData.locality = name;
          } else if (type === 'administrative_area_level_1') {
            locationData.state = name;
          } else if (type === 'country') {
            locationData.country = name;
            locationData.countryShortName = addressComp[i].short_name;
          }
        }

        city = locationData.sublocality || locationData.locality;

        if (locationData.countryShortName !== 'SE') {
          this.handleError(query.value, 'This is not a Swedish city, right?');
          return;
        }

        if (locationData.sublocality !== undefined) {
          subInfo += locationData.locality + ', ';
        }

        subInfo += locationData.state + ', ' + locationData.country;

        // Set up the new query, push and set it
        newQuery = {
          id: uuid.v4(),
          city: city,
          subInfo: subInfo
        };

        currQueryState.unshift(newQuery);
        this.setState({queries: currQueryState});
      }.bind(this),
      error: function(xhr, status, err) {
        this.handleError(query.value, 'Something went wrong. Thanks Obama.');
      }
    });
  }

  handleError(query, message) {
    let currQueryState = this.state.queries;
    let newQuery = {
      id: uuid.v4(),
      city: query,
      subInfo: message
    };

    currQueryState.unshift(newQuery);
    this.setState({queries: currQueryState});
  }

  handleDeleteItem(id) {
    let currQueryState = this.state.queries;
    let i = currQueryState.findIndex(x => x.id === id);

    currQueryState.splice(i, 1);
    this.setState({queries: currQueryState});
  }

  render() {
    return (
      <div className="page-wrap">
        <header className="site-header">
          <h1 className="logo">Searo</h1>
        </header>

        <SearchBar addItem={this.handleAddItem} />

        { this.state.queries.length ?
          <div id="search-results">
            <SearchResults queries={this.state.queries} onDelete={this.handleDeleteItem.bind(this)} />
          </div>
        : null }
      </div>
    );
  }
}

App.propTypes = {
  addItem: React.PropTypes.func,
  cities: React.PropTypes.string,
  queries: React.PropTypes.array,
  onDelete: React.PropTypes.func
}

export default App;
