const Post = require('../models/post')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { verifyToken } = require('../utils/authentication')

exports.getAllPosts = (req, res, next) => {
  const query = {}

  if (Boolean(req.query.published) === true) {
    query.published = true
  }

  Post.find(query)
    .populate('author')
    .exec((err, listPosts) => {
      if (err) {
        return next(err)
      }

      res.send(listPosts)
    })
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).exec((err, post) => {
    if (err) {
      return next(err)
    }

    res.send(post)
  })
}

exports.createNewPost = [
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content', 'Content must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.send(new Error(errors.array()))
    }

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      published: false,
      // Change author value to the current user logged in, who wrote the post
      author: '63e5e5cd6fa99ae8fa47b9f2',
    })

    post.save((err) => {
      if (err) {
        return next(err)
      }

      res.send(post)
    })
  },
]

exports.deletePost = [
  verifyToken,
  (req, res, next) => {
    Post.findByIdAndDelete(req.params.postid, (err) => {
      if (err) {
        return next(err)
      }
      res.send(`Deleted post with id ${req.params.postid}`)
    })
  },
]

const executeUpdatePost = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.send(new Error(errors.array()))
  }

  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    _id: req.params.postid,
  })

  Post.findByIdAndUpdate(
    req.params.postid,
    post,
    { new: true },
    (err, thepost) => {
      if (err) {
        return next(err)
      }
      res.send(thepost)
    }
  )
}

exports.updatePost = [
  verifyToken,

  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('content', 'Content must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('published', 'Published must be Boolean true or false.')
    .trim()
    .isBoolean()
    .escape(),

  (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        executeUpdatePost(req, res, next)
      }
    })
  },
]
