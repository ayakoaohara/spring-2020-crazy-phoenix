import React from 'react';
import './Toolbar.css';
import Hamburger from './hamburgerMenu.js';

// display toolbar
function Toolbar(){
    return(
        <div className="navBar">
		      <Hamburger/>
		      <a href="/Home"><h1 id="appname">Mobility</h1></a>
              <img id="applogo" src="./appLogo.png"/>
		    </div>
    )
}

export default Toolbar;