const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')

exports.GetMissingList = async (req, res, next) => {
    try {
        res.status(200).send('OK')
    } catch (error) {
        next(error)
    }
}

exports.GetMissingVehicleRecord = async (req, res, next) => {
    try {
        res.status(200).send('OK')
    } catch (error) {
        next(error)
    }
}

exports.opengate = async (req, res, next) => {
    try {
        res.status(200).send('OK')
    } catch (error) {
        next(error)
    }
}