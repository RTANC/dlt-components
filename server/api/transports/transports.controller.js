const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const { getDateTimeNow } = require('../../utils/utils')
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
        const sql = `select TOP (10) VehicleInID, StationID, TimeStampIn, LaneID, F1A, F1APID, (select ProvinceName from LPProvince where ProvinceID = F1APID) as F1APName, R1A, R1APID, (select ProvinceName from LPProvince where ProvinceID = R1APID) as R1APName, ImageRef, TransportID
        from VehicleIn
        where StationID = ${req.query.station} and (F1A like '${req.query.LPnumber}%' or R1A like '${req.query.LPnumber}%') and (TimeStampIn between '2021-06-01' and '2021-06-30')` //ช่วงเวลา TimeStampIn ใช้สำหรับการ demo เท่านั้น

        const licenseplates = await sequelize.query(sql, { type: QueryTypes.SELECT })
        res.status(200).send(licenseplates)
    } catch (error) {
        next(error)
    }
}

exports.getTransport = async (req, res, next) => {
    try {
        const sql = `select *
        from Transport
        where TransportID = ${req.params.id}`
        const transports = await sequelize.query(sql, { type: QueryTypes.SELECT })
        res.status(200).send(transports)
    } catch (error) {
        next(error)
    }
}

exports.createTransport = async (req, res, next) => {
    try {
        const userId = req.userData.UserID
        const { StationID, CompanyID, ObjectiveID, SrcProvinceID, SrcGoods, SrcGoodsOther, DstProvinceID, DstGoods, DstGoodsOther, VehicleInID, TimeStampIn, F1M, F1MPID, R1M, R1MPID, VehicleClassID } = req.body // TimeStampTx เวลาดึงจากฝั่ง backend นี้, UserID ดึงจาก token
        const transport = await sequelize.query(`insert Transport(StationID, TimeStampTx, CompanyID, UserID, ObjectiveID, SrcProvinceID, SrcGoods, SrcGoodsOther, DstProvinceID, DstGoods, DstGoodsOther, VehicleInID, TimeStampIn, F1M, F1MPID, R1M, R1MPID, VehicleClassID)
        values(${StationID}, '${getDateTimeNow()}', ${CompanyID}, ${userId}, ${ObjectiveID}, ${SrcProvinceID ? SrcProvinceID : 'NULL'}, ${SrcGoods}, '${SrcGoodsOther}', ${DstProvinceID ? DstProvinceID : 'NULL'}, ${DstGoods}, '${DstGoodsOther}', ${VehicleInID}, '${TimeStampIn}', '${F1M}', ${F1MPID}, '${R1M}', ${R1MPID}, ${VehicleClassID} )
        
        update VehicleIn
        set TransportID = scope_identity()
        where VehicleInID = ${VehicleInID}
        `)
        console.log(transport)

        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.updateTransport = async (req, res, next) => {
    try {
        const userId = req.userData.UserID
        const { StationID, CompanyID, ObjectiveID, SrcProvinceID, SrcGoods, SrcGoodsOther, DstProvinceID, DstGoods, DstGoodsOther, VehicleInID, TimeStampIn, F1M, F1MPID, R1M, R1MPID, VehicleClassID } = req.body // TimeStampTx เวลาดึงจากฝั่ง backend นี้, UserID ดึงจาก token

        await sequelize.query(`update Transport
        set StationID = ${StationID}, TimeStampTx = '${getDateTimeNow()}', CompanyID = ${CompanyID}, UserID = ${userId}, ObjectiveID = ${ObjectiveID}, SrcProvinceID = ${SrcProvinceID}, SrcGoods = ${SrcGoods}, SrcGoodsOther = '${SrcGoodsOther}', DstProvinceID = ${DstProvinceID}, DstGoods = ${DstGoods}, DstGoodsOther = '${DstGoodsOther}', VehicleInID = ${VehicleInID}, TimeStampIn = '${TimeStampIn}', F1M = '${F1M}', F1MPID = ${F1MPID}, R1M = '${R1M}', R1MPID = ${R1MPID}, VehicleClassID = ${VehicleClassID})
        where TransportID = ${req.params.id}`, { type: QueryTypes.UPDATE })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}