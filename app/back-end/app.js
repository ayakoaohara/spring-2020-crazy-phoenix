const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();
// import passport
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
const { getAccessibleRouteList } = require('./filter');

// set up express
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// set API key
let apiKey;
if (process.env.NODE_ENV === 'PRODUCTION') {
  apiKey = process.env.API_KEY;
} else {
  const fn = './config.json';
  const key = fs.readFileSync(fn);
  const conf = JSON.parse(key);
  apiKey = conf.API_KEY;
}

// user schema
const User = require('./db.js');

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// connecting to db
let dbUrl = '';
/*
if (process.env.NODE_ENV === 'PRODUCTION') { // localhost in travis
  dbUrl = `mongodb://localhost/test`;
} else {
  dbUrl = `mongodb://172.17.0.1:27017/container`; // for container use
}*/
dbUrl = 'mongodb://localhost/test';
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log('Could not connect to database');
  } else {
    console.log('Successfully connected to DB');
  }
});

// avoid deprecation warning for collection.ensureIndex
mongoose.set('useCreateIndex', true);

// returns a string to pass to Google Maps API
const replaceSpace = (location) => {
  let newLocation = '';
  for (let i = 0; i < location.length; i += 1) {
    if (location.charAt(i) === ' ') {
      newLocation += '+';
    } else {
      newLocation += location.charAt(i);
    }
  }
  return newLocation;
};

// query routes on Google Maps API
app.get('/data', (req, res) => {
  const origin = replaceSpace(req.query.origin);
  const destination = replaceSpace(req.query.destination);
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination},+New+York,+NY&mode=transit&alternatives=true&key=${apiKey}`;
  fetch(url, { method: 'Get' })
    .then((res) => res.json())
    .then((json) => {
      const array = getAccessibleRouteList(json);
      res.send(array);
    })
    .catch(console.error);
});

// authenticate a user at login
app.get('/authenticate', (req, res) => {
  const { email } = req.query;
  const { password } = req.query;
  req.body.username = email;
  req.body.password = password;
  passport.authenticate('local', {}, (err, user, info) => {
    if (user) {
      res.send('authenticated');
    } else {
      res.send('authentication failure');
    }
  })(req, res);
});

// register a user
app.get('/signup', (req, res) => {
  const { firstname } = req.query;
  const { lastname } = req.query;
  const { email } = req.query;
  const { password } = req.query;

  User.register(new User({
    username: email,
    email,
    firstname,
    lastname,
  }), password, (err, user) => {
    if (err) {
      res.send('error');
    } else {
      res.send('added');
    }
  });
});


module.exports = {
  app,
  replaceSpace,
};
