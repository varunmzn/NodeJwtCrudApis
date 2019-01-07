const models = require ('../models'),
      jwt = require('jsonwebtoken'),
      config = require ('../../config');

/**
 * Method to signup/register the user
 * 
 * @param {*} req 
 * @param {*} res 
*/
var login = (req, res) => {
  (models.user).findOne({email: req.body.email}, (err, user) => {
    if (err)
      return res.status(500).send({status: false, message: 'unable to login', errors: err});

    if (!user)
      return res.status(404).send({status: false, message: 'user not found', errors: 'Authentication failed. User not found.'});
      // check if password matches
      if (user.comparePassword(req.body.password)) {
        // if user is found and password is right create a token
        var token = jwt.sign({_id: user._id}, config.secret, { expiresIn: config.tokenExpireSeconds });
        // return the information including token as JSON
        return res.status(200).send ({status: true, message: 'user successfully login', data: {type: 'JWT', token: token}});
      }

      return res.status(422).send({status: false, message: 'invalid password', errors: 'Authentication failed. Wrong password.'});
  });
}

/**
 * Method to logout user
 * 
 * @param {*} req 
 * @param {*} res 
 */
var logout = (req, res) => {
  if (req.isAuthenticated()) {
    // req.session.destroy();
    console.log (req.logout());
  }
  req.logout();
  return res.status(200).send ({status: true, message: 'user successfully logout', data: {}});
}


/** 
 * module.exports must be at bottom, 
 * otherwise application won't execute
*/
module.exports = {
  login:login,
  logout: logout
}