const express = require('express')
const router = express.Router()

const loginRoutes = require('./logins')
const checkAuth = require('./middleware/auth')
const stationRoutes = require('./stations')
const companyRoutes = require('./company')
const transportRoutes = require('./transports')
const vehicleRoutes = require('./vehicles')
const goodRoutes = require('./goods')
const licenseplateRoutes = require('./licenseplates')
const agenciesRoutes = require('./agencies')
const managementsRoutes = require('./managements')
const queryRoutes = require('./query')
const profileRoutes = require('./profiles')
const reportRoutes = require('./reports')

router.get('/systems', (req, res, next) => {
    res.status(200).send({
        message: process.env.NODE_ENV
    })
})

router.use('/logins', loginRoutes)
router.use(checkAuth)
router.use('/stations', stationRoutes)
router.use('/company', companyRoutes)
router.use('/transports', transportRoutes)
router.use('/vehicles', vehicleRoutes)
router.use('/goods', goodRoutes)
router.use('/licenseplates', licenseplateRoutes)
router.use('/agencies', agenciesRoutes)
router.use('/managements', managementsRoutes)
router.use('/query', queryRoutes)
router.use('/profiles', profileRoutes)
router.use('/reports', reportRoutes)

module.exports = router