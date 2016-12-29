import React, { Component } from 'react';
import SearchBar from './js/search-bar';
import SearchResults from './js/search-result';

// const cities = [
//   'Alingsås', 'Arboga', 'Arvika', 'Askersund', 'Avesta', 'Boden', 'Bollnäs',
//   'Borgholm', 'Borlänge', 'Borås', 'Djursholm', 'Eksjö', 'Enköping',
//   'Eskilstuna', 'Eslöv', 'Fagersta', 'Falkenberg', 'Falköping', 'Falsterbo',
//   'Falun', 'Filipstad', 'Flen', 'Gränna', 'Gävle', 'Göteborg', 'Hagfors',
//   'Halmstad', 'Haparanda', 'Hedemora', 'Helsingborg', 'Hjo', 'Hudiksvall',
//   'Huskvarna', 'Härnösand', 'Hässleholm', 'Höganäs', 'Jönköping', 'Kalmar',
//   'Karlshamn', 'Karlskoga', 'Karlskrona', 'Karlstad', 'Katrineholm', 'Kiruna',
//   'Kramfors', 'Kristianstad', 'Kristinehamn', 'Kumla', 'Kungsbacka', 'Kungälv',
//   'Köping', 'Laholm', 'Landskrona', 'Lidingö', 'Lidköping', 'Lindesberg',
//   'Linköping', 'Ljungby', 'Ludvika', 'Luleå', 'Lund', 'Lycksele', 'Lysekil',
//   'Malmö', 'Mariefred', 'Mariestad', 'Marstrand', 'Mjölby', 'Motala', 'Nacka',
//   'Nora', 'Norrköping', 'Norrtälje', 'Nybro', 'Nyköping', 'Nynäshamn', 'Nässjö',
//   'Oskarshamn', 'Oxelösund', 'Piteå', 'Ronneby', 'Sala', 'Sandviken', 'Sigtuna',
//   'Simrishamn', 'Skanör', 'Skara', 'Skellefteå', 'Skänninge', 'Skövde',
//   'Sollefteå', 'Solna', 'Stockholm', 'Strängnäs', 'Strömstad', 'Sundbyberg',
//   'Sundsvall', 'Säffle', 'Säter', 'Sävsjö', 'Söderhamn', 'Söderköping',
//   'Södertälje', 'Sölvesborg', 'Tidaholm', 'Torshälla', 'Tranås', 'Trelleborg',
//   'Trollhättan', 'Trosa', 'Uddevalla', 'Ulricehamn', 'Umeå', 'Uppsala',
//   'Vadstena', 'Varberg', 'Vaxholm', 'Vetlanda', 'Vimmerby', 'Visby',
//   'Vänersborg', 'Värnamo', 'Västervik', 'Västerås', 'Växjö', 'Ystad', 'Åmål',
//   'Ängelholm', 'Örebro', 'Öregrund', 'Örnsköldsvik', 'Östersund', 'Östhammar'
// ];

class App extends Component {
  render() {
    return (
      <div className="page-wrap">
        <header className="site-header">
          <h1 className="logo">Searo</h1>
        </header>
        <SearchBar />
        <SearchResults cities={this.props.cities} />
      </div>
    );
  }
}

export default App;
