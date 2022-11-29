const moment = require('moment')
const { QueryTypes } = require('sequelize')
const sequelize = require('../connection')

exports.bool2bit = (bool) => {
    return bool ? 1 : 0
}

exports.str2bit = (str) => {
    return str === 'true' ? 1 : 0
}

exports.getDateTimeNow = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

exports.reportDateTimeFormatter = (dt) => {
    return (new Date(dt).toLocaleDateString('th-TH', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'})) + ' น.'
}

exports.getStationName = async (id) => {
    try {
        const station = await sequelize.query(`SELECT StationName FROM station where StationID = ${id}`, { type: QueryTypes.SELECT })
        return station[0].StationName
    } catch (error) {
        return error.message
    }
} 