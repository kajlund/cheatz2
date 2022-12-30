const express = require('express')

const authHandlers = require('./auth.handlers')

const router = express.Router()

router.post('/logon', authHandlers.logon)
router.post('/signup', authHandlers.signup)

module.exports = router
