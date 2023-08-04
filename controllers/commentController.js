const Comment = require('../models/comment')
const { body, validationResult } = require('express-validator')
const Post = require('../models/post')
const { verifyToken } = require('../utils/authentication')

exports.getAllComments = (req, res, next) => {
  Comment.find({ post: req.params.postid }).exec((err, listComments) => {
    if (err) {
      return next(err)
    }

    res.send(listComments)
  })
}

exports.getComment = (req, res, next) => {
  Comment.findById(req.params.commentid).exec((err, comment) => {
    if (err) {
      return next(err)
    }

    if (comment == null) {
      res.status(404).send({
        message: 'Comment not found',
      })
    }

    res.send(comment)
  })
}

exports.createNewComment = [
  body('text', 'Text must have at least 10 characters.')
    .trim()
    .isLength({ min: 10 })
    .escape(),
  body('user', 'User must not be empty').trim().isLength({ min: 1 }).escape(),
  body('email', 'Email must be in the right format').isEmail(),

  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.send(new Error(errors.array()))
    }

    Post.findById(req.params.postid).exec((err, post) => {
      if (err) {
        return next(err)
      }

      if (post == null) {
        return res.status(404).send({
          message: 'Post not found',
        })
      }

      const comment = new Comment({
        text: req.body.text,
        user: req.body.user,
        email: req.body.email,
        post: req.params.postid,
      })

      comment.save((err) => {
        if (err) {
          return next(err)
        }

        res.send(comment)
      })
    })
  },
]

exports.updateComment = [
  verifyToken,
  body('text', 'Text must have at least 10 characters.')
    .trim()
    .isLength({ min: 10 })
    .escape(),
  body('user', 'User must not be empty').trim().isLength({ min: 1 }).escape(),
  body('email', 'Email must be in the right format').isEmail(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(404).send(errors.array())
    }

    Post.findById(req.params.postid).exec((err, post) => {
      if (err) {
        return next(err)
      }

      if (post === null) {
        return res.status(404).send({
          message: 'Post not found',
        })
      }

      const comment = new Comment({
        _id: req.params.commentid,
        text: req.body.text,
        user: req.body.user,
        email: req.body.email,
        post: req.params.postid,
      })

      Comment.findByIdAndUpdate(
        req.params.commentid,
        comment,
        { new: true },
        (err, thecomment) => {
          if (err) {
            return next(err)
          }

          if (thecomment === null) {
            return res.status(404).send({
              message: 'Comment not found',
            })
          }

          res.send(thecomment)
        }
      )
    })
  },
]

exports.deleteComment = (req, res, next) => {
  verifyToken,
    Comment.findByIdAndDelete(req.params.commentid, (err, comment) => {
      if (err) {
        return next(err)
      }

      if (comment == null) {
        res.status(404).send({
          message: 'Comment not found',
        })
      }

      res.send(`Deleted comment with id ${req.params.commentid}`)
    })
}
