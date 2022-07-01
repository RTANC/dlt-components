const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')
const moment = require('moment-timezone')
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
        const sql = `select TransportID, TimeStampIn, F1M, F1MPID, (select ProvinceName from LPProvince where ProvinceID = F1MPID) as F1MPNAME, R1M, R1MPID, (select ProvinceName from LPProvince where ProvinceID = R1MPID) as R1MPNAME
        from Transport
        where StationID = ${req.query.station} and (F1M like '${req.query.LPnumber}%' or R1M like '${req.query.LPnumber}%') and YEAR(TimeStampIn) = 2021 and MONTH(TimeStampIn) = 6`

        const licenseplates = await sequelize.query(sql, { type: QueryTypes.SELECT })
        res.status(200).send(licenseplates)
    } catch (error) {
        next(error)
    }
}