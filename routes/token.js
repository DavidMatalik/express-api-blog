const express = require('express')
const router = express.Router()

const { createNewToken } = require('../controllers/tokenController')

router.post('/', createNewToken)

module.exports = router
