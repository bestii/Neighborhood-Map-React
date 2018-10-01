import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Map from './components/Map';
import Footer from './components/Footer';


class App extends Component {
  state = {
    locations: [
      {
        lat:  9.96691498300256,
        lng: 76.3181688690639,
        name: 'Priceless Factory Outlet'
      },
      {
        lat: 9.967080995007404,
        lng: 76.31812928698632,
        name: 'K R Bakes',
      },
      {
        lat: 9.965904,
        lng: 76.317918,
        name: 'Broad Bean Hotel'
      },
      {
        lat: 9.96387638705125,
        lng: 76.31343589989426,
        name: 'Welcare Hospital'
      },
      {
        lat: 9.96387638705125,
        lng: 76.31343589989426,
        name: 'Golden dragon'
      },
      {
        lat: 9.965679795023949,
        lng: 76.31514928813195,
        name: 'Hotel Emarald'
      },
      {
        lat: 9.962810458403629,
        lng: 76.31305656345499,
        name: 'Toch Public School'
      }
    ]
  }

  // Function to open menue
  openMenu = () => {
    const menu = document.getElementById('slider-menu');
    menu.classList.add('open');
  }

  // Function to close menue
  closeMenu = () => {
    const menu = document.getElementById('slider-menu');
    menu.classList.remove('open');
  }

  // Google Maps callback function
  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: 9.965459, lng: 76.313982 }
    });
  }

  // React lifecycle method
  componentDidMount() {

    // Setup InitMap function in window object
    window.initMap = this.initMap;

    // Inject google script
    injectScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAUM3a6LipkX63QmWnyMBSo6uwSCFNh7Qk&callback=initMap');
    
  }

  render() {
    const year = (new Date()).getFullYear();
    return (
      <div>
        <Header openMenu={this.openMenu} closeMenu={this.closeMenu}></Header>
        <Map />
        <Footer year={year} />
      </div>
    );
  }
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
