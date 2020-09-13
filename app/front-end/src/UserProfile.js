import React from 'react';
import './UserProfile.css'

// display user profile
function Profile(props){
    return(
        <nav className= 'drawer'>
            <ul>
                <li>Name: Lorem Ipsum</li>
                <li>Username: loremsum_iptus</li>
                <li><button onClick= {props.hamburgerHandler}>Sign Out</button></li>
            </ul>
        </nav>
    )
}

export default Profile;