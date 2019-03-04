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

router.post('/', (req, res, next) => {
  let { _owner, title, modifiedEffects, likedEffects } = req.body
  SavedProfile.create({ _owner, title, modifiedEffects, likedEffects })
    .then(savedprofile => {
      res.json({
        success: true,
        savedprofile
      })
    })
    .catch(err => next(err))
})

router.get('/:id', (req, res, next) => {
  SavedProfile.findById(req.params.id)
    .then(savedprofile => {
      res.json({
        savedprofile
      })
    })
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  SavedProfile.findByIdAndDelete(req.params.id)
    .then(savedprofile => {
      res.json({
        savedprofile
      })
    })
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  let { _owner, title, modifiedEffects, likedEffects } = req.body
  SavedProfile.findByIdAndUpdate(req.params.id, { _owner, title, modifiedEffects, likedEffects })
    .then(savedprofile => {
      res.json({
        savedprofile
      })
    })
    .catch(err => next(err))
})

module.exports = router;