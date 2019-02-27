const express = require('express');
const router = express.Router();
const ParallaxData = require('../models/ParallaxData');

/*********************************
 * GET all parallax effects
 *********************************/
router.get('/', (req, res, next) => {
  ParallaxData.find()
    .then(allParallaxData => {
      res.json(allParallaxData);
    })
    .catch(err => next(err));
});

module.exports = router;
