const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
exports.getProvinces = async (req, res, next) => {
    try {
        const provinces = await sequelize.query("SELECT * FROM TxProvince where ProvinceID > 0", { type: QueryTypes.SELECT })
        res.status(200).send(provinces)
    } catch (error) {
        next(error)
    }
}

exports.getLicensePlates = async (req, res, next) => {
    try {
        const sql = `select TOP (1000) VehicleInID, StationID, TimeStampIn, LaneID, F1A, F1APID, (select ProvinceName from LPProvince where ProvinceID = F1APID) as F1APName, R1A, R1APID, (select ProvinceName from LPProvince where ProvinceID = R1APID) as R1APName, ImageRef
        from VehicleIn
        where StationID = ${req.query.station} and (F1A like '${req.query.LPnumber}%' or R1A like '${req.query.LPnumber}%') and (TimeStampIn between '2021-06-01' and '2021-06-30')`

        const licenseplates = await sequelize.query(sql, { type: QueryTypes.SELECT })
        res.status(200).send(licenseplates)
    } catch (error) {
        next(error)
    }
}