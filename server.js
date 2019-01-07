const express = require ('express'),
  app = express (),
  port = process.env.port || 3000,
  bodyParser = require('body-parser'),
  passport = require ('passport'),
  cors = require('cors');

// establish DB connection
require ('./db');
require('./passport')(passport);

// help to prevent server shutdown on code-crash
process.on('uncaughtException', (err) => { console.log(err) });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cors())

app.use(passport.initialize());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

////////////////////////////////////////////////////////////////////////////////
// Attach cutom passport configuration
require('./passport-config');

// list all routes
require ('./app/routes')(app, passport);

// Options for authentication route
let authOpts = {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}

// Authentication route
app.post('/login', passport.authenticate('local', authOpts));

app.listen (port, () => {
  console.info (`Application is running on port ${port}`);
})
