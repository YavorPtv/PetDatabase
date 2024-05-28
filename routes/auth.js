const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../models/index');

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.users.create({ Username: username, Password: hashedPassword });
    res.redirect('/auth/login');
  } catch (err) {
    console.log(err);
    res.redirect('/auth/register');
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/auth/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/home');
  });
});

module.exports = router;