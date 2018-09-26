import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Map from './components/Map';
import Footer from './components/Footer';


class App extends Component {

  openMenu = () => {
    const menu = document.getElementById('slider-menu');
    menu.classList.add('open');
  }
  closeMenu = () => {
    const menu = document.getElementById('slider-menu');
    menu.classList.remove('open');
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: {lat: -34.397, lng: 150.644}
    });
  }

  componentDidMount() {
    
    injectScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAUM3a6LipkX63QmWnyMBSo6uwSCFNh7Qk&callback=initMap');
    window.initMap = this.initMap;
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
