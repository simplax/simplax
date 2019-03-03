const express = require('express');
const BlogPost = require('../models/BlogPost')

const router = express.Router();
const { isLoggedIn } = require('../middlewares')

router.get('/', isLoggedIn, (req, res, next) => {
  BlogPost.find()
    .then(blogposts => {
      res.json(blogposts)
    })
    .catch(err => next(err))
})

router.post('/', (req, res, next) => {
  let { title, blogContent } = req.body
  BlogPost.create({ title, blogContent })
    .then(blogpost => {
      res.json({
        success: true,
        blogpost
      });
    })
    .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
  BlogPost.findById(req.params.id)
    .then(blogpost => {
      res.json({
        blogpost
      })
    })
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  BlogPost.findByIdAndDelete(req.params.id)
    .then(blogpost => {
      res.json({
        blogpost
      })
    })
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  let { title, blogContent } = req.body
  BlogPost.findByIdAndUpdate(req.params.id, { title, blogContent })
    .then(blogpost => {
      res.json({
        blogpost
      })
    })
    .catch(err => next(err))

})


module.exports = router;