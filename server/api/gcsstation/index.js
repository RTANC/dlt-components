const express = require('express')
const router = express.Router()

const { GetMissingList, GetMissingVehicleRecord, opengate, getServerTime } = require('./gcsstation.controller')
router.get('/GetMissingList', GetMissingList)
router.get('/GetMissingVehicleRecord', GetMissingVehicleRecord)
router.get('/opengate', opengate)
router.get('/getservertime', getServerTime)
module.exports = router