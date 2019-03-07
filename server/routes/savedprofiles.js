const express = require('express');
const SavedProfile = require('../models/SavedProfile')

const router = express.Router();
const { isLoggedIn } = require('../middlewares')

router.get('/', isLoggedIn, (req, res, next) => {
  SavedProfile.find({ _owner: req.user._id })
    .then(savedprofiles => {
      res.json(savedprofiles)
    })
    .catch(err => next(err))
})

router.post('/', isLoggedIn, (req, res, next) => {
  let { title, modifiedEffects, likedEffects } = req.body
  let _owner = req.user._id
  SavedProfile.create({ _owner, title, modifiedEffects, likedEffects })
    .then(savedprofile => {
      res.json({
        success: true,
        savedprofile
      })
    })
    .catch(err => next(err))
})

router.get('/:id', isLoggedIn, (req, res, next) => {
  SavedProfile.findById(req.params.id)
    .then(savedprofile => {
      res.json({
        savedprofile
      })
    })
    .catch(err => next(err))
})

router.delete('/:id', isLoggedIn, (req, res, next) => {
  SavedProfile.findOneAndDelete({ _id: req.params.id, _owner: req.user._id })
    .then(savedprofile => {
      res.json({
        savedprofile
      })
    })
    .catch(err => next(err))
})

router.put('/:title', isLoggedIn, (req, res, next) => {
  let { title, modifiedEffects, likedEffects } = req.body
  SavedProfile.findOneAndUpdate({ title: req.params.title, _owner: req.user._id }, { title, modifiedEffects, likedEffects })
    .then(savedprofile => {
      res.json({
        savedprofile
      })
    })
    .catch(err => next(err))
})

module.exports = router;