const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const { dateTimeSQLFormatter } = require('../../utils/utils')
const moment = require('moment')

module.exports = async (req, res, next) => {
    try {
        const { StationID } = req.body
        const sql_query = `select VehicleInID, TransportID, TimeStampIn, (select Description from VehicleGroup where vin.VehicleGroupID = VehicleGroup.VehicleGroupID) as VehicleGroup, RFID, F1A, (select ProvinceName from LPProvince where vin.F1APID = LPProvince.ProvinceID) as FrontLPProvince, R1A, (select ProvinceName from LPProvince where vin.R1APID = LPProvince.ProvinceID) as RearLPProvince, (CONCAT('/public/vehimages/', StationID, '/', LaneID, '/', YEAR(TimeStampIn), '/', FORMAT(MONTH(TimeStampIn),'D2'), '/', FORMAT(DAY(TimeStampIn), 'D2'), '/IN/IN-', ImageRef, '-0.jpg')) as LPFrontImg, (CONCAT('/public/vehimages/', StationID, '/', LaneID, '/', YEAR(TimeStampIn), '/', FORMAT(MONTH(TimeStampIn),'D2'), '/', FORMAT(DAY(TimeStampIn), 'D2'), '/IN/IN-', ImageRef, '-1.jpg')) as LPRearImg
        from VehicleIn as vin
        where StationID = ${StationID} and TimeStampIn between '${dateTimeSQLFormatter(moment().subtract(2, 'days').startOf('day'))}' and '${dateTimeSQLFormatter(moment())}' and VehicleOutID IS NULL`
        const vehicleIn = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        res.status(200).send(vehicleIn)
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}