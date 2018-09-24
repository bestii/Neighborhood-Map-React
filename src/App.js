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
  render() {
    const year = (new Date()).getFullYear();
    return (
      <div>
        <Header openMenu={this.openMenu} closeMenu={this.closeMenu}></Header>
        <Map />
        <Footer year={year}/>
      </div>
    );
  }
}

export default App;
