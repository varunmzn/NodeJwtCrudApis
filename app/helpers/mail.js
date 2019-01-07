'use strict';
const nodemailer = require('nodemailer'),
  config = require ('../../config'),

// create reusable transporter object using the default SMTP transport
transporter = nodemailer.createTransport({
  host: config.MAIL_HOST,
  port: config.MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
      user: config.MAIL_USER, // generated ethereal user
      pass: config.MAIL_PASSWORD // generated ethereal password
  }
});
  

let send = (to, subject, message = null, html = null) => {
  // setup email data with unicode symbols
  let mailOptions = {
    from: config.MAIL_FROM, // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: message, // plain text body
    html: html
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
  });
}

module.exports = {
  send: send
}