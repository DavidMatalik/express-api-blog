const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

exports.createNewToken = [
  body('userName', 'Name of user cannot be empty')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must have at least 8 characters.')
    .trim()
    .isLength({ min: 8 })
    .escape(),

  (req, res, next) => {
    // Noch checken was validation oben ergibt.

    // Okay, so prinzipiell, wie gehts jetzt hier weiter?
    // Check in DB if user exists
    // If user exists, create the token and send the token
    // Here my notes I made from the auth video come into play
    // First go with a mock user, later implement real DB retrieval of user

    // Post.findById(req.params.id).exec((err, post) => {
    //   if (err) {
    //     return next(err)
    //   }

    //   res.send(post)
    // }

    User.findOne({ name: req.body.name }).exec((err, user) => {
      if (err) {
        return next(err)
      }
      console.log('user', user)
    })

    // Mock user
    const user = {
      id: 1,
      name: 'david',
    }

    jwt.sign({ user }, 'secretkey', (err, token) => {
      res.json({
        token,
      })
    })

    // const errors = validationResult(req)
    // if (!errors.isEmpty()) {
    //   res.send(new Error(errors.array()))
    // }
    // const post = new Post({
    //   title: req.body.title,
    //   content: req.body.content,
    //   published: false,
    //   // Change author value to the current user logged in, who wrote the post
    //   author: '63e5e5cd6fa99ae8fa47b9f2',
    // })
    // post.save((err) => {
    //   if (err) {
    //     return next(err)
    //   }
    //   res.send(post)
    // })
  },
]
