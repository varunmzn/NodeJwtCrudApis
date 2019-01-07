var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    User = require ('./app/models/user'),
    config = require ('./config');

module.exports = (passport) => {
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        console.log(jwt_payload)
        console.log("helloas")
        User.findById(jwt_payload._id, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};