// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models/index');

module.exports = function(passport) {
  passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.users.findOne({ where: { Username: username } });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const isValidPassword = await bcrypt.compare(password, user.Password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.Id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.users.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
