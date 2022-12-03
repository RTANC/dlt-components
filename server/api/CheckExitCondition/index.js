const moment = require('moment')
const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const { dateTimeSQLFormatter } = require('../../utils/utils')
module.exports = async (req, res, next) => {
    const { stationID, laneID, seqID, RFID, timeStamp, frontLicensePlate, rearLicensePlate } = req.body
    // const sql_query = `select *
    // from VehicleIn
    // where StationID = ${stationID} and (TimeStampIn between '${dateTimeSQLFormatter(moment(timeStamp).subtract(1, 'days').startOf('day'))}' and '${dateTimeSQLFormatter(timeStamp)}') and TransportID IS NOT NULL and RFID = '${RFID}'`
    // const vehicleInId = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
    try {
        res.status(200).send({
            stationID: stationID,
            laneID: laneID,
            seqID: seqID,
            result: 'OK'
        })
    } catch (error) {
        res.status(500).send({
            stationID: stationID,
            laneID: laneID,
            seqID: seqID,
            result: error.message
        })
    }
}