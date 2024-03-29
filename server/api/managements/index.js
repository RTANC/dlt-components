const express = require('express')
const router = express.Router()

const { getUsers, getUser, createUser, updateUser, getCompanies, getCompany, createCompany, updateCompany, getG1Vehicles, getG1Vehicle, createG1Vehicle, updateG1Vehicle, deleteG1Vehicle, getG2Vehicles, getG2Vehicle, createG2Vehicle, updateG2Vehicle, deleteG2Vehicle, getG2VehicleRules, getG2VehicleRule, updateG2VehicleRule, getG2Rules, getIncidents, getIncident, createIncident, updateIncident, deleteIncident } = require('./managements.controller')

router.get('/users', getUsers)
router.get('/users/:uid', getUser)
router.post('/users', createUser)
router.patch('/users/:id', updateUser)

router.get('/company', getCompanies)
router.get('/company/:companyId', getCompany)
router.post('/company/', createCompany)
router.patch('/company/:companyId', updateCompany)

router.get('/G1/vehicles', getG1Vehicles)
router.get('/G1/vehicles/:id', getG1Vehicle)
router.post('/G1/vehicles', createG1Vehicle)
router.patch('/G1/vehicles/:id', updateG1Vehicle)
router.delete('/G1/vehicles/:id', deleteG1Vehicle)

router.get('/G2/vehicles', getG2Vehicles)
router.get('/G2/vehicles/:id', getG2Vehicle)
router.post('/G2/vehicles', createG2Vehicle)
router.patch('/G2/vehicles/:id', updateG2Vehicle)
router.delete('/G2/vehicles/:id', deleteG2Vehicle)

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