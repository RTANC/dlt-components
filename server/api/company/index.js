const express = require('express')
const router = express.Router()

const { getCompany } = require('./company.controller')

router.get('/', getCompany)
// router.get('/:uid', getUser)

// router.patch('/:uid', updateUser)
// router.patch('/:uid/grants', adminOwner, grant)

// router.delete('/:uid', adminOwner, deleteUser)

module.exports = router