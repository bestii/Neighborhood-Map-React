import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js'


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
    return (
      <Header openMenu={this.openMenu} closeMenu={this.closeMenu}></Header>
    );
  }
}

export default App;
