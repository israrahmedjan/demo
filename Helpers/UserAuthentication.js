// authentication process
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// User data (in a real application, use a database)
const users = [
  { id: 1, username: 'israr', password: 'israr123' },
];
// Passport configuration
passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    return done(null, user);
  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});



const UserLogin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/User/login',
  passReqToCallback: true
}
);




module.exports = { UserLogin }
