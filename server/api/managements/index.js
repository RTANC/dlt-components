const express = require('express')
const router = express.Router()

const { getUsers, getUser, getCompanies, getCompany, getG1Vehicles, getG2Vehicles, getG2VehicleRules, getG2Rules, getG2Rule, getIncidents, getIncident } = require('./managements.controller')

router.get('/users', getUsers)
router.get('/users/:uid', getUser)

router.get('/company', getCompanies)
router.get('/company/:companyId', getCompany)

router.get('/G1/vehicles', getG1Vehicles)

router.get('/G2/vehicles', getG2Vehicles)

router.get('/G2/vehiclerules', getG2VehicleRules)

router.get('/G2/rules', getG2Rules)
router.get('/G2/rules/:station', getG2Rule)

router.get('/incidents/', getIncidents)
router.get('/incidents/:id', getIncident)

// router.patch('/:uid', updateUser)
// router.patch('/:uid/grants', adminOwner, grant)

// router.delete('/:uid', adminOwner, deleteUser)

module.exports = router