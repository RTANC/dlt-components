const express = require('express')
const router = express.Router()

const { getProvinces } = require('./provinces.controller')

router.get('/', getProvinces)
// router.get('/:uid', getUser)

// router.patch('/:uid', updateUser)
// router.patch('/:uid/grants', adminOwner, grant)

// router.delete('/:uid', adminOwner, deleteUser)

module.exports = router