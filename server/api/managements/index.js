const express = require('express')
const router = express.Router()

const { getUsers, getUser, getCompanies, getCompany } = require('./managements.controller')

router.get('/users', getUsers)
router.get('/users/:uid', getUser)

router.get('/company', getCompanies)
router.get('/company/:companyId', getCompany)

// router.patch('/:uid', updateUser)
// router.patch('/:uid/grants', adminOwner, grant)

// router.delete('/:uid', adminOwner, deleteUser)

module.exports = router