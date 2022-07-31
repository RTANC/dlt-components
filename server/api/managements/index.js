const express = require('express')
const router = express.Router()

const { getUsers, getUser, getCompanies, getCompany, getG1Vehicles, getG1Vehicle, getG2Vehicles, getG2Vehicle, createG2Vehicle, getG2VehicleRules, getG2VehicleRule, updateG2VehicleRule, getG2Rules, getIncidents, getIncident, createIncident, updateIncident, deleteIncident } = require('./managements.controller')

router.get('/users', getUsers)
router.get('/users/:uid', getUser)

router.get('/company', getCompanies)
router.get('/company/:companyId', getCompany)

router.get('/G1/vehicles', getG1Vehicles)
router.get('/G1/vehicles/:id', getG1Vehicle)

router.get('/G2/vehicles', getG2Vehicles)
router.get('/G2/vehicles/:id', getG2Vehicle)
router.post('/G2/vehicles', createG2Vehicle)

router.get('/G2/vehiclerules', getG2VehicleRules)
router.get('/G2/vehiclerules/:station', getG2VehicleRule)
router.patch('/G2/vehiclerules/:station', updateG2VehicleRule)

router.get('/G2/rules', getG2Rules)

router.get('/incidents/', getIncidents)
router.get('/incidents/:id', getIncident)
router.post('/incidents', createIncident)
router.patch('/incidents/:id', updateIncident)
router.delete('/incidents/:id', deleteIncident)
// router.patch('/:uid', updateUser)
// router.patch('/:uid/grants', adminOwner, grant)

// router.delete('/:uid', adminOwner, deleteUser)

module.exports = router