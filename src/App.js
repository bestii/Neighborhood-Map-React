import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
    <header>
        <div className="sticky-header box-shadow">
            <div className="header-menu text-center d-inline-block h-100 w-10">
                <i className="fa fa-bars fs-24 cursor-pointer hamburger" id="hamburger-ico"></i>
            </div>
            <div className="header-content text-center d-inline-block h-100 w-80">
                <h1 className="fs-20">Neigborhood Map</h1>
            </div>
        </div>
        <nav className="menu menu-vertical menu-left box-shadow h-100" id="slider-menu">
            <i id="close-ico" className="fa fa-close fs-24 cursor-pointer close"></i>
            <ul className="location-list">
                <li>Celery seakale</li>
                <li>Dulse daikon</li>
                <li>Zucchini garlic</li>
                <li>Catsear azuki bean</li>
                <li>Dandelion bunya</li>
                <li>Rutabaga</li>
            </ul>
        </nav>
    </header>
    );
  }
}

export default App;
