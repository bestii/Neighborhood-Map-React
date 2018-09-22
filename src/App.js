import React, { Component } from 'react';
import './App.css';
import { Icon } from 'react-icons-kit';
import { bars, close } from 'react-icons-kit/fa/'

class App extends Component {
  render() {
    return (
      <header>
        <div className="sticky-header box-shadow">
          <div className="header-menu text-center d-inline-block w-10">
            <Icon className="cursor-pointer" size={20} icon={bars} />
          </div>
          <div className="header-content text-center d-inline-block w-80">
            <h1 className="fs-20">Neigborhood Map</h1>
          </div>
        </div>
        <nav className="menu menu-vertical menu-left box-shadow h-100" id="slider-menu">
          <div className="text-right p-10">
            <Icon className="cursor-pointer" size={24} icon={close} />
          </div>
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
