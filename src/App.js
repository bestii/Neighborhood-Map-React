import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';
import Header from './components/Header'
import Map from './components/Map';
import Footer from './components/Footer';


class App extends Component {

  state = {
    map: '',
    infowindow: '',
    locations: [],
    locationList: [],
    query: "",
  };

  updateQuery = (query) => {
    this.setState({
      query: query
    });
    this.filterLocationList(query);
  };

  filterLocationList = (query) => {
    this.closeInfoWindow();

    let locationList = this.state.locationList.map(location => {
      if (query) {
        const match = new RegExp(escapeRegExp(query), 'i');
        if (match.test(location.name)) {
          location.showInList = true;
          location.marker.setVisible(true);
        } else {
          location.showInList = false;
          location.marker.setVisible(false);
        }
      } else {
        location.showInList = true;
        location.marker.setVisible(true);
      }

      return location;
    });

    this.setState({
      locationList: locationList
    });
  }

  openInfoWindow = (location) => {
    this.state.infowindow.setContent(location.contentString);
    this.state.infowindow.open(this.state.map, location.marker);
  };

  closeInfoWindow = () => {
    this.state.infowindow.close();
  };

  // Function to open menue
  openMenu = () => {
    const menu = document.getElementById('slider-menu');
    menu.classList.add('open');
  };

  // Function to close menue
  closeMenu = () => {
    const menu = document.getElementById('slider-menu');
    menu.classList.remove('open');
  };

  // Google Maps callback function
  initMap = () => {

    // Map object
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: { lat: 9.965459, lng: 76.313982 }
    });

    // Infowindow object
    let infowindow = new window.google.maps.InfoWindow();

    // Add marker for each location
    let locationList = this.state.locations.map(location => {

      //Create Marker object
      location.marker = new window.google.maps.Marker({
        map: map,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
        position: { lat: location.venue.location.lat, lng: location.venue.location.lng },
        title: location.venue.name
      });

      // setup the content string for each location
      location.contentString = `${location.venue.name}`;

      location.name = location.venue.name;
      location.showInList = true;

      // Add event listener to each marker to open infowindow
      location.marker.addListener('click', function () {
        infowindow.setContent(location.contentString);
        infowindow.open(map, location.marker);
      });

      return location;
    });

    // Set the map, marker and infowindow
    this.setState({
      map: map,
      infowindow: infowindow,
      locationList: locationList
    });

  };

  getLocation = () => {
    const locationEndPoint = 'https://api.foursquare.com/v2/venues/explore';
    const parameters = {
      client_id: 'LWKO1TIGB3UBE1K1XMEQEJXLEYGDXCO5N1RVBKH0US3OA3JC',
      client_secret: 'W1OTJSKFMFJ0RZZF3PRFN2LC1SUS3YQAOUJCQK05KQZVYOLD',
      ll: '9.965459,76.313982',
      radius: '1000',
      v: '20180926',
      section: 'food',
      limit: '7'
    }

    axios.get(locationEndPoint, {
      params: parameters
    }).then(response => {

      this.setState(
        { locations: response.data.response.groups[0].items },
        // Callback function
        this.setupGoogleMaps()
      );

    }).catch(error => {
      console.error("Get request failed", error);
    })
  };

  setupGoogleMaps = () => {

    // Setup InitMap function in window object
    window.initMap = this.initMap;

    // Inject google script
    injectScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAUM3a6LipkX63QmWnyMBSo6uwSCFNh7Qk&callback=initMap');

  };

  // React lifecycle method
  componentDidMount() {

    // Get the locations when the App is mounted.
    this.getLocation();

  };


  render() {
    const year = (new Date()).getFullYear();
    return (
      <div>
        <Header
          openMenu={this.openMenu}
          closeMenu={this.closeMenu}
          locations={this.state.locationList}
          updateQuery={this.updateQuery}
          query={this.state.query}
          openInfoWindow={this.openInfoWindow}></Header>
        <Map />
        <Footer year={year} />
      </div>
    );
  };
}

// Function to inject script into the DOM
function injectScript(url) {
  let tag = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');

  script.src = url;
  script.async = true;
  script.onerror = function () {
    document.write("Google Maps can't be loaded. Please try reloading the page.");
  };

  tag.parentNode.insertBefore(script, tag);
}

export default App;
