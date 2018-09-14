const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load profile model
const Profile = require('../../models/Profile');
// loda user profile
const User = require('../../models/User');


// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Profile works'}));


// @route   GET api/profile/
// @desc    get current user's profile
// @access  Private
router.get('/', 
  passport.authenticate('jwt', { session: false}), 
  (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  });
module.exports = router;