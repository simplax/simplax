const express = require('express');
const BlogPost = require('../models/BlogPost')

const router = express.Router();
const { isLoggedIn } = require('../middlewares')

router.get('/', (req, res, next) => {
  BlogPost.find()
    .then(blogposts => {
      res.json(blogposts)
    })
    .catch(err => next(err))
})




module.exports = router;