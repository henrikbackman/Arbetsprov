/*
  Made by Henrik Backman
  www.henrikbackman.com
*/

/*global $, moment*/

'use strict';

var HM = HM || {};

HM.search = function () {

  var cities = ['Alingsås', 'Arboga', 'Arvika', 'Askersund', 'Avesta', 'Boden', 'Bollnäs', 'Borgholm', 'Borlänge', 'Borås', 'Djursholm', 'Eksjö', 'Enköping', 'Eskilstuna', 'Eslöv', 'Fagersta', 'Falkenberg', 'Falköping', 'Falsterbo', 'Falun', 'Filipstad', 'Flen', 'Gränna', 'Gävle', 'Göteborg', 'Hagfors', 'Halmstad', 'Haparanda', 'Hedemora', 'Helsingborg', 'Hjo', 'Hudiksvall', 'Huskvarna', 'Härnösand', 'Hässleholm', 'Höganäs', 'Jönköping', 'Kalmar', 'Karlshamn', 'Karlskoga', 'Karlskrona', 'Karlstad', 'Katrineholm', 'Kiruna', 'Kramfors', 'Kristianstad', 'Kristinehamn', 'Kumla', 'Kungsbacka', 'Kungälv', 'Köping', 'Laholm', 'Landskrona', 'Lidingö', 'Lidköping', 'Lindesberg', 'Linköping', 'Ljungby', 'Ludvika', 'Luleå', 'Lund', 'Lycksele', 'Lysekil', 'Malmö', 'Mariefred', 'Mariestad', 'Marstrand', 'Mjölby', 'Motala', 'Nacka', 'Nora', 'Norrköping', 'Norrtälje', 'Nybro', 'Nyköping', 'Nynäshamn', 'Nässjö', 'Oskarshamn', 'Oxelösund', 'Piteå', 'Ronneby', 'Sala', 'Sandviken', 'Sigtuna', 'Simrishamn', 'Skanör', 'Skara', 'Skellefteå', 'Skänninge', 'Skövde', 'Sollefteå', 'Solna', 'Stockholm', 'Strängnäs', 'Strömstad', 'Sundbyberg', 'Sundsvall', 'Säffle', 'Säter', 'Sävsjö', 'Söderhamn', 'Söderköping', 'Södertälje', 'Sölvesborg', 'Tidaholm', 'Torshälla', 'Tranås', 'Trelleborg', 'Trollhättan', 'Trosa', 'Uddevalla', 'Ulricehamn', 'Umeå', 'Uppsala', 'Vadstena', 'Varberg', 'Vaxholm', 'Vetlanda', 'Vimmerby', 'Visby', 'Vänersborg', 'Värnamo', 'Västervik', 'Västerås', 'Växjö', 'Ystad', 'Åmål', 'Ängelholm', 'Örebro', 'Öregrund', 'Örnsköldsvik', 'Östersund', 'Östhammar'];

  var substringMatcher = function (strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  var autocomplete = function () {
    $('#main-search').typeahead({
      hint: true,
      highlight: true,
      minLength: 1,
    }, {
      name: 'cities',
      source: substringMatcher(cities),
    }).bind('typeahead:select', function (ev, suggestion) {
      searchRequest(suggestion);
    }).on('keyup', function (e) {
      if (e.keyCode == '13') {
        searchRequest($(e.target).val());
      }
    });
  };

  var searchRequest = function (suggestion) {
    $.ajax({
      url: 'http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=' + suggestion,
      type: 'GET',
      success: function (data) {
        populateSearch(data);
      },
    });
  };

  var populateSearch = function (data) {
    moment().locale('sv');

    var subInfo = '',
        locationData = [],
        date = moment().format('YYYY-MM-DD HH:mm'),
        searchResultsContainer = $('.search-results');

    if ($('ul', searchResultsContainer).length === 0) {
      searchResultsContainer.append('<ul></ul>');
    }

    if (data.results.length === 0) {
      showError(date, searchResultsContainer);
      return;
    }

    data = data.results[0].address_components;

    for (var i = 0; i < data.length; i++) {
      var type = data[i].types[0],
          name = data[i].long_name;

      if (type == 'political') {
        locationData.sublocality = name;
      } else if (type == 'locality') {
        locationData.locality = name;
      } else if (type == 'administrative_area_level_1') {
        locationData.state = name;
      } else if (type == 'country') {
        locationData.country = name;
        locationData.countryShortName = data[i].short_name;
      }
    }

    var city = locationData.sublocality || locationData.locality;

    if (locationData.countryShortName != 'SE') {
      showError(date, searchResultsContainer);
      return;
    }

    if (locationData.sublocality != undefined) {
      subInfo += locationData.locality + ', ';
    }

    subInfo += locationData.state + ', ';
    subInfo += locationData.country;

    var item = '<li class="item">' +
      '<div class="location">' +
        '<div class="city">' + city + '</div>' +
        '<div class="sub-info">' +
          subInfo +
        '</div>' +
      '</div>' +
      '<div class="date">' + date + '</div>' +
      '<a href="#" class="remove"></a>' +
    '</li>';

    $('ul', searchResultsContainer).prepend(item);

    removeItem();
    clearInput();
  };

  var showError = function (date, container) {
    var item = '<li class="item error">' +
      '<div class="location">' +
        '<div class="sub-info">Unable to find a Swedish city, please try again</div>' +
      '</div>' +
      '<a href="#" class="remove"></a>' +
    '</li>';

    $('ul', container).prepend(item);
  };

  var clearInput = function () {
    $('#main-search').val('');
  };

  var removeItem = function () {
    $('.search-results .remove').on('click', function (e) {
      e.preventDefault();

      $(e.target).parents('.item').remove();

      if ($('.search-results .item').length === 0) {
        $('.search-results ul').remove();
      }
    });
  };

  return {
    init: function () {

      autocomplete();

    },
  };
}();

$(document).ready(HM.search.init);
