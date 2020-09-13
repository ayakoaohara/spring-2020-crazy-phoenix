import React from 'react';
import './possibleRoutes.css';
import {Link} from "react-router-dom";
import Toolbar from './toolbar.js';

// parse input, string representing a route, to be displayed as search result
const getShortRoute = (routeObjectString) => {
  const object = JSON.parse(routeObjectString);
  const legs = object.legs;
  let routePath = '';
  for (let j = 0; j < legs.length; j++) {
    const steps = legs[j].steps;
    for (let k = 0; k < steps.length; k++) {
      if (steps[k].travel_mode === 'TRANSIT') {
        routePath += steps[k].transit_details.departure_stop.name;
        routePath += "(" +steps[k].transit_details.departure_time.text+")";
        routePath += '---> ';
        routePath += steps[k].transit_details.arrival_stop.name;
        routePath += "(" +steps[k].transit_details.arrival_time.text+")";
      } else {
        routePath += steps[k].travel_mode;
      }
      routePath += '->';
    }
  }
  return routePath;
};

const PossibleRoutes = (props) => {
  const routes = props.location.state;
  const routesList = routes.routes;

  const routeObjectStringArray = [];
  for (let i = 0; i < routesList.length; i++) {
    const string = JSON.stringify(routesList[i]);
    routeObjectStringArray.push(string);
  }
  return (
    <header id='possibleRoutes'>
    <Toolbar/>
    <div className="possibleRoutes">
    <Link to="/Home"><div className="bk-btn"><div className="bk-btn-triangle"></div><div className="bk-btn-bar"></div></div></Link>
      <h1>Possible Routes</h1>
      <section className="content">
        {routeObjectStringArray.map(routeString => (
          <div class='smallContent'>
          <section className="route"><div className='padd'>{getShortRoute(routeString)}
           <Link to={{pathname: '/Route', state: {routeString}}} id='routelink'>select</Link></div>
          </section>
          </div>
        ))}
      </section>
    </div>
    </header>
  );
};

export default PossibleRoutes;