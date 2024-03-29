const express = require('express')
const router = express.Router()

const { getProvinces, getLicensePlates, getTransport, createTransport, updateTransport } = require('./transports.controller')

router.get('/provinces', getProvinces)
router.get('/licenseplates', getLicensePlates)

router.get('/:id', getTransport)

router.post('/', createTransport)

router.patch('/:id', updateTransport)
// router.patch('/:uid/grants', adminOwner, grant)

// router.delete('/:uid', adminOwner, deleteUser)

module.exports = router