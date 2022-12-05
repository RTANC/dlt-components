const moment = require('moment')
const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const { dateTimeSQLFormatter } = require('../../utils/utils')
module.exports = async (req, res, next) => {
    const { stationID, laneID, seqID, RFID, timeStamp, frontLicensePlate, rearLicensePlate } = req.body
    try {
        const sql_query = `select *
        from VehicleIn
        where StationID = ${stationID} and (TimeStampIn between '${dateTimeSQLFormatter(moment(timeStamp).subtract(2, 'days').startOf('day'))}' and '${dateTimeSQLFormatter(timeStamp)}') and TransportID IS NOT NULL and VehicleOutID IS NULL and (RFID = '${RFID}' or (F1A like '${frontLicensePlate.plateNumber}%' or R1A like '${rearLicensePlate.plateNumber}%'))`
        const vehicleIn = await sequelize.query(sql_query, { type: QueryTypes.SELECT })

        if (vehicleIn.length === 0) {
            throw Error('NONE')
        } else if (vehicleIn.length > 0) {
            const vehicleOutId = await sequelize.query(`select VehicleOutID from VehicleOut where StationID = ${stationID} and TimeStampOut = '${dateTimeSQLFormatter(timeStamp)}' and RFID = '${RFID}'`, { type: QueryTypes.SELECT })
            const update_query = `update VehicleIn
            set VehicleOutID = ${vehicleOutId}, MatchBy = 0
            where VehicleInID = ${vehicleIn[0].VehicleInID}
            
            update VehicleOut
            set VehicleInID = ${vehicleIn[0].VehicleInID}, TransportID = ${vehicleIn[0].TransportID}
            where VehicleOutID = ${vehicleOutId}
            
            update Transport
            set VehicleInID = ${vehicleIn[0].VehicleInID}, VehicleOutID = ${vehicleOutId}
            where TransportID = ${vehicleIn[0].TransportID}`
            await sequelize.query(update_query, { type: QueryTypes.UPDATE })

            res.status(200).send({
                stationID: stationID,
                laneID: laneID,
                seqID: seqID,
                result: 'OK'
            })
        }
    } catch (error) {
        res.status(500).send({
            stationID: stationID,
            laneID: laneID,
            seqID: seqID,
            result: error.message
        })
    }
}