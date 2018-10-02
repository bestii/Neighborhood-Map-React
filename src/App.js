import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import escapeRegExp from 'escape-string-regexp';
import Header from './components/Header'
import Map from './components/Map';
import Footer from './components/Footer';


class App extends Component {

  // App state
  state = {
    map: '',
    infowindow: '',
    locations: [],
    locationList: [],
    query: "",
  };

  // Update query function
  updateQuery = (query) => {
    this.setState({
      query: query
    });
    // Filter the list when the query is updated 
    this.filterLocationList(query);
  };

  // Function to filter the list based on the query
  filterLocationList = (query) => {

    // Close any active infowindow when filter is applied
    this.closeInfoWindow();
    
    // Get the filtered location list
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

  // Function to open infowindow
  openInfoWindow = (location) => {
    this.state.infowindow.setContent(location.contentString);
    this.state.infowindow.open(this.state.map, location.marker);
  };

  // Function to close infowindow
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
      location.contentString = `<strong>${location.venue.name}</strong>
                                <p>Address: ${location.venue.location.address} </p>`;

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

  // Function to get the nearby locations using Foursquare API
  getLocation = () => {
    const locationEndPoint = 'https://api.foursquare.com/v2/venues/explore';
    const parameters = {
      client_id: '<ADD_FORURSQUARE_CLIENT_ID_HERE>',
      client_secret: '<ADD_FORURSQUARE_CLIENT_SECRET_HERE>',
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
      console.error("Request Failed", error);
    })
  };

  // Function to setup Google maps
  setupGoogleMaps = () => {

    // Setup InitMap function in window object
    window.initMap = this.initMap;

    // Inject google script
    injectScript('https://maps.googleapis.com/maps/api/js?key=<ADD_GOOGLE_MAPS_API_KEY_HERE>');

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
