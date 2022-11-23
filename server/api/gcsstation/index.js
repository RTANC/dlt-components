const express = require('express')
const router = express.Router()

const { GetMissingList, GetMissingVehicleRecord, opengate } = require('./gcsstation.controller')
router.get('/GetMissingList', GetMissingList)
router.get('/GetMissingVehicleRecord', GetMissingVehicleRecord)
router.get('/opengate', opengate)
module.exports = router