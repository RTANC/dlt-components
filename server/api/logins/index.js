const express = require('express')
const router = express.Router()

const { login } = require('./logins.controller')

router.post('/', login)

module.exports = router