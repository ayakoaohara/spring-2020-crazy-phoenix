const express = require('express');
const app = express();
const fetch = require('node-fetch');
const cors = require('cors');
const getAccessibleRouteList = require('./filter').getAccessibleRouteList;
const path = require('path');
const fs = require('fs');
require('dotenv').config();
// passport
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(express.urlencoded({extended: false}));
const fn = './config.json';
const key = fs.readFileSync(fn);
const conf = JSON.parse(key);
const apiKey = conf.API_KEY;
const sampleUrl = 'https://maps.googleapis.com/maps/api/directions/json?origin=Columbia+University&destination=Hudson+Yards,+New+York,+NY&mode=transit&alternatives=true&key='+apiKey;

// schema
const User = require('./db.js');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// connecting to db
//const DB_USER = process.env.DB_USER;
//const DB_PASS = process.env.DB_PASS;
//const DB_HOST = process.env.DB_HOST;
//const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`;
const dbUrl = 'mongodb://localhost/group_project';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log('Could not connect to database');
  }
  console.log("Successfully connected to DB");
});

// avoid deprecation warning for collection.ensureIndex
mongoose.set('useCreateIndex', true);


app.get('/data', (req, res) => {
  fetch(sampleUrl, {method: "Get"})
    .then(res => res.json())
    .then((json) => {
      const array = getAccessibleRouteList(json);
      res.send(array);
    })
    .catch(console.error);
});

app.get('/authenticate', (req, res) => {/*
  const email = req.query.email;
  const password = req.query.password;
  req.body.email = email;
  req.body.password = password;
  passport.authenticate('local', {}, (err, user, info) => {
    if (user) {
      res.send('authenticated');
    } else {
      res.send('authentication failure');
    }
  })(req, res);*/
  res.send('authenticated');
});


module.exports = app;