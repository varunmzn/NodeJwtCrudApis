const models = require ('../models'),
  jwt = require('jsonwebtoken'),
  config = require ('../../config'),
  Mail = require ('../helpers/mail');
/**
 * Method to signup/register the user
 * 
 * @param {*} req 
 * @param {*} res 
*/
let signup = (req, res) => {
  let user = new models.user(req.body);

  // save user data
  user.save ((err, data) => {
    if (err) 
      return res.status(422).send({status: false, message: 'unable to register user', errors: err.message});
      var token = jwt.sign(user.toJSON(), config.secret, { expiresIn: config.tokenExpireSeconds });
    return res.status(200).send ({status: true, message: 'user successfully registered', data: {userId: data._id ,type: 'JWT', token: token}});
  })
}

/**
 * Method to reset password link sent on user email
 * @param {*} req 
 * @param {*} res 
 */
let forgotPassword = (req, res) => {
  // search user by email
  (models.user).findOne ({email: req.body.email}, (err, user) => {
    if (err) 
      return res.status(500).send({status: false, message: 'error occur', errors: err.message});
    if (!user)
      return res.status(404).send({status: false, message: 'unable to find user', errors: 'user not found!'});

    // send link for reset password
    (new models.forgotPassword ({user: user._id, identifier : (new Date().getTime()).toString() })).save ((err, identifier) => {
      if (err) 
        return res.status(500).send({status: false, message: 'error occur', errors: err.message});
      
      let link = req.headers.host + '/reset-password/'+identifier.identifier;

      // send forget-password email
      Mail.send (req.body.email, 'Reset Password link', 'Please, click below link to reset password', '<a href="'+link+'">'+link+'</a>')

      return res.status(200).send ({status: true, message: 'We have just sent you an Email. Please check for reset-password link.', data: {link:link}});
    })
  });
}

/**
 * Method to reset password
 * @param {*} req 
 * @param {*} res 
 */
let resetPassword = (req, res) => {
  // search user by email
  (models.forgotPassword).
  findOne ({identifier: req.params.identifier})
  .populate ('user')
  .exec ((err, identifier) => {
    if (err) return res.status(500).send({status: false, message: 'error occur', errors: err.message});

    if (!identifier || !identifier.user[0])
      return res.status(404).send({status: false, message: 'unable to find user', errors: 'user not found!'});

    // update user password
    (identifier.user[0]).updateOne({password: req.body.password}, (err, user) => {
      if (err) return res.status(500).send({status: false, message: 'unable to change password', errors: err.message});

      // delete identifier belongs to same user
      identifier.deleteAll();

      return res.status(200).send({status: true, message: 'password successfully changed.', data: {}});
    });
  });
}

/** 
 * module.exports must be at bottom, 
 * otherwise application won't execute
*/
module.exports = {
  signup:signup,
  forgotPassword:forgotPassword,
  resetPassword: resetPassword
}