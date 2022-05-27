const express = require('express')
const router = express.Router()

const stationRoutes = require('./stations')
router.get('/systems', (req, res, next) => {
    res.status(200).send({
        message: process.env.NODE_ENV
    })
})

router.use('/stations', stationRoutes)

module.exports = router