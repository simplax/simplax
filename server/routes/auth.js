const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github-login', passport.authenticate('github'));

router.get(
  '/github-login/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res, next) => {
    res.redirect(process.env.FRONTEND_URI + '/success-login');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'You are out!' });
});

router.get('/loggedin', (req, res, next) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = router;
