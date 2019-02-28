const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ParallaxData = require("../models/ParallaxData");

/*********************************
 * GET all liked parallax effects
 *********************************/
router.get("/:ids", (req, res, next) => {
  const ids = req.params.ids.split("-");
  const objectIds = ids.map(id => mongoose.Types.ObjectId(`${id}`));
  ParallaxData.find({ _id: { $in: objectIds } })
    .then(parallaxData => {
      res.json(parallaxData);
    })
    .catch(err => next(err));
});

module.exports = router;
