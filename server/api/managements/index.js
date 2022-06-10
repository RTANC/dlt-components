const express = require('express')
const router = express.Router()

const { getUsers } = require('./managements.controller')

router.get('/users', getUsers)
// router.get('/:uid', getUser)

// router.patch('/:uid', updateUser)
// router.patch('/:uid/grants', adminOwner, grant)

// router.delete('/:uid', adminOwner, deleteUser)

module.exports = router