const express = require('express')
const router = express.Router()

const stationRoutes = require('./stations')
const companyRoutes = require('./company')
const transportRoutes = require('./transports')
const vehicleRoutes = require('./vehicles')
const goodRoutes = require('./goods')
const licenseplateRoutes = require('./licenseplates')

router.get('/systems', (req, res, next) => {
    res.status(200).send({
        message: process.env.NODE_ENV
    })
})

router.use('/stations', stationRoutes)
router.use('/company', companyRoutes)
router.use('/transports', transportRoutes)
router.use('/vehicles', vehicleRoutes)
router.use('/goods', goodRoutes)
router.use('/licenseplates', licenseplateRoutes)

module.exports = router