const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.BACKEND_URI + "/api/github-login/callback"
},
  (accessToken, refreshToken, profile, cb) => {
    User.findOne({ _github: profile.id })
      .then(user => {
        if (user) {
          return cb(null, user);
        }

        const newUser = new User({
          _github: profile.id,
          githubUsername: profile.username,

        });

        newUser.save()
          .then(user => {
            console.log("user", user)
            cb(null, newUser);
          })
      })
      .catch(error => {

      })
  }
));
