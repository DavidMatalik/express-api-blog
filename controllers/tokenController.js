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
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    User.findOne({ name: req.body.userName }).exec((err, user) => {
      if (err) {
        return next(err)
      }
      if (req.body.password !== user.password) {
        return res.status(401).send('Invalid credentials')
      }

      jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
          token,
        })
      })
    })
  },
]
