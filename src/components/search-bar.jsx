import React from 'react';
import uuid from 'uuid';
import Autosuggest from 'react-autosuggest';

const cities = [ 'Alingsås', 'Arboga', 'Arvika', 'Askersund', 'Avesta', 'Boden', 'Bollnäs', 'Borgholm', 'Borlänge', 'Borås', 'Djursholm', 'Eksjö', 'Enköping', 'Eskilstuna', 'Eslöv', 'Fagersta', 'Falkenberg', 'Falköping', 'Falsterbo', 'Falun', 'Filipstad', 'Flen', 'Gränna', 'Gävle', 'Göteborg', 'Hagfors', 'Halmstad', 'Haparanda', 'Hedemora', 'Helsingborg', 'Hjo', 'Hudiksvall', 'Huskvarna', 'Härnösand', 'Hässleholm', 'Höganäs', 'Jönköping', 'Kalmar', 'Karlshamn', 'Karlskoga', 'Karlskrona', 'Karlstad', 'Katrineholm', 'Kiruna', 'Kramfors', 'Kristianstad', 'Kristinehamn', 'Kumla', 'Kungsbacka', 'Kungälv', 'Köping', 'Laholm', 'Landskrona', 'Lidingö', 'Lidköping', 'Lindesberg', 'Linköping', 'Ljungby', 'Ludvika', 'Luleå', 'Lund', 'Lycksele', 'Lysekil', 'Malmö', 'Mariefred', 'Mariestad', 'Marstrand', 'Mjölby', 'Motala', 'Nacka', 'Nora', 'Norrköping', 'Norrtälje', 'Nybro', 'Nyköping', 'Nynäshamn', 'Nässjö', 'Oskarshamn', 'Oxelösund', 'Piteå', 'Ronneby', 'Sala', 'Sandviken', 'Sigtuna', 'Simrishamn', 'Skanör', 'Skara', 'Skellefteå', 'Skänninge', 'Skövde', 'Sollefteå', 'Solna', 'Stockholm', 'Strängnäs', 'Strömstad', 'Sundbyberg', 'Sundsvall', 'Säffle', 'Säter', 'Sävsjö', 'Söderhamn', 'Söderköping', 'Södertälje', 'Sölvesborg', 'Tidaholm', 'Torshälla', 'Tranås', 'Trelleborg', 'Trollhättan', 'Trosa', 'Uddevalla', 'Ulricehamn', 'Umeå', 'Uppsala', 'Vadstena', 'Varberg', 'Vaxholm', 'Vetlanda', 'Vimmerby', 'Visby', 'Vänersborg', 'Värnamo', 'Västervik', 'Västerås', 'Växjö', 'Ystad', 'Åmål', 'Ängelholm', 'Örebro', 'Öregrund', 'Örnsköldsvik', 'Östersund', 'Östhammar' ];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : cities.filter(city =>
    city.toLowerCase().slice(0, inputLength) === inputValue
  );
};

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = suggestion => (
  <div>
    {suggestion}
  </div>
);

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: {},
      value: '',
      suggestions: [],
      requestData: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.value !== '') {
      this.setState({searchQuery: {
        id: uuid.v4(),
        value: this.state.value
      }}, function() {
        this.props.addItem(this.state.searchQuery);
      });
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Search for Swedish cities...',
      ref: 'search',
      value,
      onChange: this.onChange
    };

    return (
      <div id="search">
        <div className="search-container">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="main-search"></label>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.handleSubmit}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
            />
          </form>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  addItem: React.PropTypes.func,
  onSubmit: React.PropTypes.func
}

export default SearchBar;
