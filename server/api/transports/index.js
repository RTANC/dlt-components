const express = require('express')
const router = express.Router()

const { getProvinces, getLicensePlates } = require('./transports.controller')

router.get('/provinces', getProvinces)
router.get('/licenseplates', getLicensePlates)
// router.get('/:uid', getUser)

// router.patch('/:uid', updateUser)
// router.patch('/:uid/grants', adminOwner, grant)

// router.delete('/:uid', adminOwner, deleteUser)

module.exports = router