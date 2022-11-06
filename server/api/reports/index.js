const express = require('express')
const router = express.Router()
const { gcs01 } = require('./report.controller')

router.get('/GCS/01', gcs01)

module.exports = router