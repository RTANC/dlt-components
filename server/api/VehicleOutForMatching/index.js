const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const { dateSQLFormatter } = require('../../utils/utils')
const moment = require('moment')

module.exports = async (req, res, next) => {
    try {
        const { StationID } = req.body
        const sql_query = `select VehicleOutID, TimeStampOut, LaneID, RFID, F2A, (select ProvinceName from LPProvince where vout.F2APID = LPProvince.ProvinceID) as FrontLPProvince, R2A, (select ProvinceName from LPProvince where vout.R2APID = LPProvince.ProvinceID) as RearLPProvince, (CONCAT('/vehimages/', StationID, '/', LaneID, '/', YEAR(TimeStampOut), '/', FORMAT(MONTH(TimeStampOut),'D2'), '/', FORMAT(DAY(TimeStampOut), 'D2'), '/OUT/OUT-', ImageRef, '-0.jpg')) as LPFrontImg, (CONCAT('/vehimages/', StationID, '/', LaneID, '/', YEAR(TimeStampOut), '/', FORMAT(MONTH(TimeStampOut),'D2'), '/', FORMAT(DAY(TimeStampOut), 'D2'), '/OUT/OUT-', ImageRef, '-1.jpg')) as LPRearImg
        from VehicleOut as vout
        where StationID = ${StationID} and VehicleInID IS NULL and CAST(TimeStampOut as DATE) = '${dateSQLFormatter(moment())}'
        ORDER BY TimeStampOut DESC`
        const vehicleOut = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        res.status(200).send(vehicleOut)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}