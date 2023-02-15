const express = require('express')
const router = express.Router()

const loginRoutes = require('./logins')
const {webAuth, apiAuth} = require('./middleware/auth')
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
const vehicleRecordRoutes = require('./VehicleRecords')
const CheckExitConditionRoutes = require('./CheckExitCondition')
const gcsstationRoutes = require('./gcsstation')
const VehicleInForMatchingRoutes = require('./VehicleInForMatching')
const VehicleOutForMatchingRoutes = require('./VehicleOutForMatching')
const GunMatchingRoutes = require('./GunMatching')
const RFIDInfoRoutes = require('./RFIDInfo')

router.get('/test', async (req,res,next)=>{
    try{
        res.status(200).send({
            message: 'System status On.'
        })
    } catch(err) {
        res.sendStatus(500)
    }
})
router.post('/VehicleRecord', apiAuth, vehicleRecordRoutes)
router.post('/CheckExitCondition', apiAuth, CheckExitConditionRoutes)
router.post('/VehicleInForMatching', apiAuth, VehicleInForMatchingRoutes)
router.post('/VehicleOutForMatching', apiAuth, VehicleOutForMatchingRoutes)
router.post('/GunMatching', apiAuth, GunMatchingRoutes)
router.post('/RFIDInfo', apiAuth, RFIDInfoRoutes)
router.use('/logins', loginRoutes)
router.use(webAuth)
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