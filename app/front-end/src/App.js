import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignupForm from './SignUp.js';
import LoginForm from './Login.js';
import {HomePage} from './HomePage.js';
import DetailedRoute from './DetailedRoute.js';
import PossibleRoutes from './possibleRoutes';
import logo from './logo.svg';
import './App.css';

function App(props) {

    return (
      <div className="App">
      <Router>
      <Switch>
        {/* <header className="App-header"> */}
        
        <Route path="/Login">
          <LoginForm/>
        </Route>
        <Route path="/SignUp">
          <SignupForm/>
        </Route>
        
        {/* </header> */}
        <Route path = "/Home">
          <HomePage></HomePage>
        </Route>
        <Route path = "/Route">
          <DetailedRoute></DetailedRoute>
        </Route>

        <Route path="/possibleRoutes">
          <PossibleRoutes/>
        </Route>
      </Switch>
      </Router>
                
      </div>
    );
}
export default App;
