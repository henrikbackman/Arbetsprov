import React from 'react';
import uuid from 'uuid';

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: {},
      value: '',
      requestData: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static defaultProps = {
    cities: [ 'Alingsås', 'Arboga', 'Arvika', 'Askersund', 'Avesta', 'Boden', 'Bollnäs', 'Borgholm', 'Borlänge', 'Borås', 'Djursholm', 'Eksjö', 'Enköping', 'Eskilstuna', 'Eslöv', 'Fagersta', 'Falkenberg', 'Falköping', 'Falsterbo', 'Falun', 'Filipstad', 'Flen', 'Gränna', 'Gävle', 'Göteborg', 'Hagfors', 'Halmstad', 'Haparanda', 'Hedemora', 'Helsingborg', 'Hjo', 'Hudiksvall', 'Huskvarna', 'Härnösand', 'Hässleholm', 'Höganäs', 'Jönköping', 'Kalmar', 'Karlshamn', 'Karlskoga', 'Karlskrona', 'Karlstad', 'Katrineholm', 'Kiruna', 'Kramfors', 'Kristianstad', 'Kristinehamn', 'Kumla', 'Kungsbacka', 'Kungälv', 'Köping', 'Laholm', 'Landskrona', 'Lidingö', 'Lidköping', 'Lindesberg', 'Linköping', 'Ljungby', 'Ludvika', 'Luleå', 'Lund', 'Lycksele', 'Lysekil', 'Malmö', 'Mariefred', 'Mariestad', 'Marstrand', 'Mjölby', 'Motala', 'Nacka', 'Nora', 'Norrköping', 'Norrtälje', 'Nybro', 'Nyköping', 'Nynäshamn', 'Nässjö', 'Oskarshamn', 'Oxelösund', 'Piteå', 'Ronneby', 'Sala', 'Sandviken', 'Sigtuna', 'Simrishamn', 'Skanör', 'Skara', 'Skellefteå', 'Skänninge', 'Skövde', 'Sollefteå', 'Solna', 'Stockholm', 'Strängnäs', 'Strömstad', 'Sundbyberg', 'Sundsvall', 'Säffle', 'Säter', 'Sävsjö', 'Söderhamn', 'Söderköping', 'Södertälje', 'Sölvesborg', 'Tidaholm', 'Torshälla', 'Tranås', 'Trelleborg', 'Trollhättan', 'Trosa', 'Uddevalla', 'Ulricehamn', 'Umeå', 'Uppsala', 'Vadstena', 'Varberg', 'Vaxholm', 'Vetlanda', 'Vimmerby', 'Visby', 'Vänersborg', 'Värnamo', 'Västervik', 'Västerås', 'Växjö', 'Ystad', 'Åmål', 'Ängelholm', 'Örebro', 'Öregrund', 'Örnsköldsvik', 'Östersund', 'Östhammar' ]
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.refs.search.value !== '') {
      this.setState({searchQuery: {
        id: uuid.v4(),
        value: this.refs.search.value
      }}, function() {
        this.props.addItem(this.state.searchQuery);
      });
    }
  }

  handleChange(e) {
    this.setState({searchQuery: {
      id: uuid.v4(),
      value: e.target.value
    }});
  }

  render() {
    let cityList = this.props.cities.map(city => {
      return <option key={city}>{city}</option>;
    });

    return (
      <div id="search">
        <div className="search-container">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="main-search"></label>
            <input type="search" id="main-search" name="main-search" ref="search" placeholder="Search for Swedish cities..." autoComplete="off" list="cities" onKeyUp={this.handleChange} />
            <datalist id="cities">
              {cityList}
            </datalist>
          </form>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  addItem: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  onKeyUp: React.PropTypes.func
}

export default SearchBar;
