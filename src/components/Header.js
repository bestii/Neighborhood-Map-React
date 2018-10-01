import React from 'react';
import { Icon } from 'react-icons-kit';
import { bars, close } from 'react-icons-kit/fa/';

// Functional Header Component
function Header(props) {
    return (
        <header>
            <div className="sticky-header box-shadow">
                <div className="header-menu text-center d-inline-block w-10">
                    <Icon className="cursor-pointer" size={20} icon={bars} onClick={props.openMenu} />
                </div>
                <div className="header-content text-center d-inline-block w-80">
                    <h1 className="fs-20">Neigborhood Map</h1>
                </div>
            </div>
            <nav className="menu menu-vertical menu-left box-shadow h-100 open" id="slider-menu">
                <div className="text-right p-10">
                    <Icon className="cursor-pointer" size={24} icon={close} onClick={props.closeMenu} />
                </div>
                <div>
                    <input className="form-control" placeholder="Filter" />
                </div>
                <ul className="location-list text-center">
                    {
                        props.markers.map((marker, indx) => {
                            return (
                                <li className={'cursor-pointer' + (indx ? ' border-top' : '')} 
                                    key={indx}>{marker.title}</li>
                            );
                        })
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header;