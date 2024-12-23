const express = require('express')
const router = express.Router()

const { getStatics } = require('./statics.controller')
const { getStatics } = require('./vehicles.controller')

router.post('/static', getStatics)
router.post('/vehiclein', getVehicleIn)
router.post('/vehicleout', getVehicleOut)

module.exports = router