const controllers = require ('./controllers');

module.exports = (app, passport) => {

  /**
   * Home page route
   */
  app.get ('/', (req, res) => {
    return res.status(200).send({status: true, message: 'application successfully working', data: {name: 'Ticketing', vsersion: '1.0.0'}})
  })

  /**
   * Routes for account management
   * signup, forgot-password, reset-password, veryfy-email
   */
  app.post ('/login', controllers.auth.login);
  app.post ('/logout', passport.authenticate('jwt', { session: false}), controllers.auth.logout);
  app.post ('/signup', controllers.account.signup);
  app.post ('/forgot-password', controllers.account.forgotPassword);
  app.put ('/reset-password/:identifier', controllers.account.resetPassword);

  app.get('/user', passport.authenticate('jwt', { session: false}), controllers.users.detail);
  app.get('/users', passport.authenticate('jwt', { session: false}), controllers.users.list);
  app.get('/users/:_id', passport.authenticate('jwt', { session: false}), controllers.users.get);
  app.delete('/users/:_id', passport.authenticate('jwt', { session: false}), controllers.users.del);
  app.put ('/users/:_id', passport.authenticate('jwt', { session: false}), controllers.users.update);

  app.post ('/image', controllers.image.upload);
  app.get ('/image/:type/:_id', controllers.image.get);


  app.post ('/saveIssue', passport.authenticate('jwt', { session: false}),controllers.projects.saveIssue);
  app.post ('/createProject',passport.authenticate('jwt', { session: false}), controllers.projects.createProject);
  app.get ('/listProjects', passport.authenticate('jwt', { session: false}),controllers.projects.listProjects);
  


}