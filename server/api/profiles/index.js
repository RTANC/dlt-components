const express = require('express')
const router = express.Router()

const { getUserProfile, updateUserProfile } = require('./profiles.controller')

router.get('/', getUserProfile)
router.patch('/', updateUserProfile)

module.exports = router