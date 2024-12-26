const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const { getImageURL } = require("../../utils/utils")

exports.getVehicleIn = async (req, res, next) => {
    let resp = {
        ResultCode : '20000',
        ResultMsg : 'Success',
        ResultData: []
    }
    try {
        let rows = await sequelize.query(`select VehicleInID, TimeStampIn, LaneID, F1A, (select ProvinceName from LPProvince where ProvinceID = F1APID) [F1AProv], R1A, (select ProvinceName from LPProvince where ProvinceID = R1APID) [R1AProv], NULL [TransportID], NULL [VehicleOutID], StationID, ImageRef
            from VehicleIn
            where StationID = ${req.body.StationID} and TimeStampIn BETWEEN '${req.body.DateFrom}' AND '${req.body.DateTo}' and (F1A LIKE '%${req.body.LicPlate}%' OR R1A LIKE '%${req.body.LicPlate}%')`, { type: QueryTypes.SELECT });
        
        for (let i = 0;i < rows.length;i++) {
            const { VehicleInID, TimeStampIn, LaneID, F1A, F1AProv, R1A, R1AProv, TransportID, VehicleOutID, StationID, ImageRef } = rows[i]
            resp.ResultData.push({
                VehicleInID,
                TimeStampIn,
                LaneID,
                F1A,
                F1AProv,
                R1A,
                R1AProv,
                TransportID,
                VehicleOutID,
                ImageIn: {
                    ImgLicFront: getImageURL(StationID, LaneID, TimeStampIn, ImageRef, 0),
                    ImgLicRear: getImageURL(StationID, LaneID, TimeStampIn, ImageRef, 1),
                    ImgFront: getImageURL(StationID, LaneID, TimeStampIn, ImageRef, 2),
                    ImgRear: getImageURL(StationID, LaneID, TimeStampIn, ImageRef, 3)
                }
            })
        }
        res.status(200).send(resp)
    } catch (error) {
        next(error)
    }
}

exports.getVehicleOut = async (req, res, next) => {
    let resp = {
        ResultCode : '20000',
        ResultMsg : 'Success',
        ResultData: []
    }
    try {
        let rows = await sequelize.query(`select VehicleOutID, TimeStampOut, LaneID, F2A, (select ProvinceName from LPProvince where ProvinceID = F2APID) [F2AProv], R2A, (select ProvinceName from LPProvince where ProvinceID = R2APID) [R2AProv], GrossWt, FrontNoLoadWt, FrontMaxWt, RearNoLoadWt, RearMaxWt, NoLoadWt, MaxWt, GoodsWt, (select Description from VehicleClass where VehicleClass.VehicleClassID = VehicleOut.VehicleClassID) [VehicleClass], NumAxles, Axle01, Axle02, Axle03, Axle04, Axle05, Axle06, Axle07, Axle08, Axle09, Axle10, NULL [TransportID], NULL [VehicleInID], StationID, ImageRef
        from VehicleOut
        where StationID = ${req.body.StationID} and TimeStampOut BETWEEN '${req.body.DateFrom}' AND '${req.body.DateTo}' and (F2A LIKE '%${req.body.LicPlate}%' OR R2A LIKE '%${req.body.LicPlate}%')`, { type: QueryTypes.SELECT });
        
        for (let i = 0;i < rows.length;i++) {
            const { VehicleOutID, TimeStampOut, LaneID, F2A, F2AProv, R2A, R2AProv, GrossWt, FrontNoLoadWt, FrontMaxWt, RearNoLoadWt, RearMaxWt, NoLoadWt, MaxWt, GoodsWt, VehicleClass, NumAxles, Axle01, Axle02, Axle03, Axle04, Axle05, Axle06, Axle07, Axle08, Axle09, Axle10, TransportID, VehicleInID, StationID, ImageRef } = rows[i]
            resp.ResultData.push({
                VehicleOutID,
                TimeStampOut,
                LaneID,
                F2A,
                F2AProv,
                R2A,
                R2AProv,
                GrossWt,
                FrontNoLoadWt,
                FrontMaxWt,
                RearNoLoadWt,
                RearMaxWt,
                NoLoadWt,
                MaxWt,
                GoodsWt,
                VehicleClass,
                NumAxles,
                Axle01,
                Axle02,
                Axle03,
                Axle04,
                Axle05,
                Axle06,
                Axle07,
                Axle08,
                Axle09,
                Axle10,
                TransportID,
                VehicleInID,
                ImageIn: {
                    ImgLicFront: getImageURL(StationID, LaneID, TimeStampOut, ImageRef, 0),
                    ImgLicRear: getImageURL(StationID, LaneID, TimeStampOut, ImageRef, 1),
                    ImgFront: getImageURL(StationID, LaneID, TimeStampOut, ImageRef, 2),
                    ImgRear: getImageURL(StationID, LaneID, TimeStampOut, ImageRef, 3)
                }
            })
        }
        res.status(200).send(resp)
    } catch (error) {
        next(error)
    }
}