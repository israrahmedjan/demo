// passport.js

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'israr123'
};

passport.use(new JwtStrategy(opts, (jwtPayload, done) => {

  console.log("Jwt stratagey is called !")
  
  // Here you would typically find the user in your database and return it
  // For demonstration, let's assume we have a hardcoded user
  const user = { id: jwtPayload.sub, username: jwtPayload.username };
  return done(null, user);
}));

module.exports = passport;
