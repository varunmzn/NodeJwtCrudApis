'use strict';

/*!
 * Module dependencies
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./app/models/user');

// Used to serialize the user for the session
passport.serializeUser(function (user, done) {
    return done(null, user.id);
});

// Used to deserialize the user
passport.deserializeUser(function (id, done) {
  User
    .findById(id, function (err, user) {
        if (err) {
            return done(err);
        } else {
            return done(null, user);
        }
    });
});

// Set Local Strategy for authentication
passport.use(new LocalStrategy(
  function (email, password, done) {
    User.findOne({email:email}, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      if (password !== user.password) {
        return done(null, false, { message: "Incorrect password." })
      }
      return done(null, user);
    });
  }
));