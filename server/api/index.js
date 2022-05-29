const express = require('express')
const router = express.Router()

const stationRoutes = require('./stations')
const companyRoutes = require('./company')
const provinceRoutes = require('./provinces')
const vehicleRoutes = require('./vehicles')
const goodRoutes = require('./goods')

router.get('/systems', (req, res, next) => {
    res.status(200).send({
        message: process.env.NODE_ENV
    })
})

router.use('/stations', stationRoutes)
router.use('/company', companyRoutes)
router.use('/provinces', provinceRoutes)
router.use('/vehicles', vehicleRoutes)
router.use('/goods', goodRoutes)

module.exports = router