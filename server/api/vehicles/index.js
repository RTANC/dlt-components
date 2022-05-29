const express = require('express')
const router = express.Router()

const { getVehicleClasses } = require('./classes/vehicles.classes.controller')
const { getVehicleGroups } = require('./groups/vehicles.groups.controller')

router.get('/classes', getVehicleClasses)
router.get('/groups', getVehicleGroups)

module.exports = router