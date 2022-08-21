const express = require('express')
const router = express.Router()

const { getTransports, getVehicleIn, getVehicleOut } = require('./query.controller')

router.get('/transports', getTransports)
router.get('/vehiclesIn', getVehicleIn)
router.get('/vehiclesOut', getVehicleOut)

module.exports = router