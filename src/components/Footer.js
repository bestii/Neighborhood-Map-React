import React from 'react';

// Function Footer Component
function Footer(props){
    return(
        <footer className="text-center sticky-footer box-shadow-reverse">
            <p className="fs-12 font-weight-bold copyright">© Neigborhood Map {props.year}.</p>
        </footer>
    );
}

export default Footer;

