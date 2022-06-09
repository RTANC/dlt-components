const express = require('express')
const router = express.Router()

const { getAgencies } = require('./agencies.controller')

router.get('/', getAgencies)
// router.get('/:uid', getUser)

// router.patch('/:uid', updateUser)
// router.patch('/:uid/grants', adminOwner, grant)

// router.delete('/:uid', adminOwner, deleteUser)

module.exports = router