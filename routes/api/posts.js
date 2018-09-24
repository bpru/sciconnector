const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Test post route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Posts works'}));

// @route   POST api/posts/
// @desc    create post
// @access  Private
router.post('/', 
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(404).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post))
      .catch(err => res.json(err));

  })

// @route   GET api/posts/
// @desc    get all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({nopost: 'No posts found'}));
})

// @route   GET api/posts/:id
// @desc    get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({nopost: 'No post found'}));
})


// @route   DELETE api/posts/:id
// @desc    delete post by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    Post.findById(req.params.id).then(post => {
      // check current user
      if (post.user.toString() !== req.user.id) {
        return res
                .status(401)
                .json({notauthorized: 'User not authorized'});
      }
      // delete
      post.remove().then(() => res.json({success: true}))
                                .catch(err => res.status(404)
                                .json({postnotfound: 'No post found'}))
    })
  })
})

// @route   POST api/posts/like/:id
// @desc    like post
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    Post.findById(req.params.id).then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({alreadyliked: 'User has alreayd liked this post'});
      }
      // add user id to likes array
      post.likes.unshift({user: req.user.id});
      post.save().then(post => res.json(post));
    }).catch( err => res.status(404).json({postnotfound: 'No post found'}));
  });
});

// @route   POST api/posts/unlike/:id
// @desc    unlike post
// @access  Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({user: req.user.id}).then(profile => {
    Post.findById(req.params.id).then(post => {
      if (post.likes.filter(post => post.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({notliked: 'You have not liked this post'});
      }
      // find like index
      const removeIdx = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
      // remove like
      post.likes.splice(removeIdx, 1);
      // save
      post.save().then(post => res.json(post));
    }).catch(err => { res.status(404).json({postnotfound: 'No post found'})});
  });
});
module.exports = router;