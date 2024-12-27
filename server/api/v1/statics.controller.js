const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')
const { isNULL } = require("../../utils/utils")
const moment = require('moment')

exports.getStatics = async (req, res, next) => {
    let resp = {
        ResultCode : '20000',
        ResultMsg : 'Success',
        ResultData: []
    }
    try {
        if (isNULL(req.body.DateWt)) {
            resp.ResultData = await sequelize.query(`select TOP 1 RunID, StationID, TimeStamp, SeqNumber, LaneID, (select Description from VehicleClass where VehicleClass.VehicleClassID = static.VehicleClassID) [VehicleClass], LPR_Number, (select ProvinceName from LPProvince where ProvinceID = LPR_ProvinceID) [LPRProv], LPR_ImageName, VehicleImageName, Goods, DepartedFrom, Destination, Notes, GVW_Weight_max, GVW_Weight_Measured, GVW_Weight_Over, IsOverWeight
            from static
            where StationID = ${req.body.StationID} and LaneID = ${req.body.LaneID}
            order by TimeStamp DESC`, { type: QueryTypes.SELECT });
        } else {
            resp.ResultData = await sequelize.query(`select RunID, StationID, TimeStamp, SeqNumber, LaneID, (select Description from VehicleClass where VehicleClass.VehicleClassID = static.VehicleClassID) [VehicleClass], LPR_Number, (select ProvinceName from LPProvince where ProvinceID = LPR_ProvinceID) [LPRProv], LPR_ImageName, VehicleImageName, Goods, DepartedFrom, Destination, Notes, GVW_Weight_max, GVW_Weight_Measured, GVW_Weight_Over, IsOverWeight
            from static
            where StationID = ${req.body.StationID} and TimeStamp BETWEEN '${moment(req.body.DateWt).startOf('day').format('YYYY-MM-DDTHH:mm:ss')}' AND '${moment(req.body.DateWt).endOf('day').format('YYYY-MM-DDTHH:mm:ss')}' and LaneID = ${req.body.LaneID}
            order by TimeStamp DESC`, { type: QueryTypes.SELECT });
        }
        res.status(200).send(resp)
    } catch (error) {
        next(error)
    }
}