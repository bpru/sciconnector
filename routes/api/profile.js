const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load validation
const validataProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');
// load profile model
const Profile = require('../../models/Profile');
// loda user profile
const User = require('../../models/User');


// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Profile works'}));

// @route   GET api/profile/all
// @desc    get all profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .then(profiles => {
      if (!profiles) {
        errors.nopfofile = 'There is no profile';
        res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => res.status(400).json({noprofile: 'there is no profile'})); 
})

// @route   GET api/profile/handle/:handle
// @desc    get current user's profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};
  Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    get current user's profile by user id
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'There is no profile for this user';
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => 
      res.status(404).json({profile: 'There is no profile for this user'}));
});


// @route   GET api/profile/
// @desc    get current user's profile
// @access  Private
router.get('/', 
  passport.authenticate('jwt', { session: false}), 
  (req, res) => {
    const errors = {};
    Profile.findOne({user: req.user.id})
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(400).json(err));
  });

// @route   POST api/profile/
// @desc    create or edit current user's profile
// @access  Private
router.post('/', 
  passport.authenticate('jwt', { session: false}), 
  (req, res) => {

    const {errors, isValid} = validataProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUsername) profileFields.githubUsername = req.body.githubUsername;
    // skills: split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }

    // social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    
    Profile.findOne({user: req.user.id}).then(profile => {
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          {user: req.user.id},
          {$set: profileFields},
          {new: true}
        ).then(profile => res.json(profile));
      } else {
        // create

        // check if handle already exists
        Profile.findOne({handle: req.body.handle}).then(profile => {
          if (profile) {
            errors.handle = 'That handle already exists';
            res.status(400).json(errors);
          }
          // save profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        })
      }
    })
  });

// @route   POST api/profile/experience
// @desc    add experience to current user's profile
// @access  Private
router.post('/experience', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {errors, isValid} = validateExperienceInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // add to experience array in the front
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile))
      .catch(err => res.json(err));
    })
    .catch(err => res.json(err));
})

// @route   POST api/profile/education
// @desc    add education to current user's profile
// @access  Private
router.post('/education', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {errors, isValid} = validateEducationInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        major: req.body.major,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      // add to education array in the front
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile)).catch(err => res.json(err));
    })
    .catch(err => res.json(err));
})

// @route   DELETE api/profile/education/edu_id
// @desc    delete education from current user's profile
// @access  Private
router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // find the index of experience to be removed
      const removeId = profile.education.map(item => item.id).indexOf(req.params.edu_id);
      // remove experience
      profile.education.splice(removeId, 1);
      profile.save().then(profile => res.json(profile)).catch(err => res.json(err));
    })  
    .catch(err => res.json(err));
})


// @route   DELETE api/profile/experience/exp_id
// @desc    delete experience from current user's profile
// @access  Private
router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      // find the index of experience to be removed
      const removeId = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
      // remove experience
      profile.experience.splice(removeId, 1);
      profile.save().then(profile => res.json(profile)).catch(err => res.json(err));
    })  
    .catch(err => res.json(err));
})

// @route   DELETE api/profile/
// @desc    delete  user and profile
// @access  Private
router.delete(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        User.findOneAndRemove({_id: req.user.id})
          .then(() => res.json({ success: true}));
      });  
      
})

module.exports = router;