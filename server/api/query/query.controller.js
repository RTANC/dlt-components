const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection');
const { str2bit } = require('../../utils/utils');

exports.getTransports = async (req, res, next) => {
    try {
        let extWhere = ``
        if (parseInt(req.query.company) > 0) {
            extWhere += ` and CompanyID = ${req.query.company}`
        }
        if (parseInt(req.query.inProvince) > 0) {
            extWhere += ` and SrcProvinceID = ${req.query.inProvince}`
        }
        if (parseInt(req.query.outProvince) > 0) {
            extWhere += ` and DstProvinceID = ${req.query.outProvince}`
        }
        if (parseInt(req.query.vehicleClass) > 0) {
            extWhere += ` and VehicleClassID = ${req.query.vehicleClass}`
        }
        if (parseInt(req.query.goodCategory) > 0) {
            const bitpower = Math.pow(2, parseInt(req.query.goodCategory) - 1)
            extWhere += ` and (((SrcGoods & ${bitpower}) = ${bitpower}) or ((DstGoods & ${bitpower}) = ${bitpower}))`
        }
        if (req.query.lp !== '') {
            extWhere += ` and ((F1M like '%${req.query.lp}%') or (R1M like '%${req.query.lp}%') or (VehicleOut.RFID like '%${req.query.lp}%'))`
        }
        if (req.query.isVehicleInStation === 'true') {
            extWhere += ` and TimeStampOut IS NULL`
        }
        if (req.query.isOverWeight === 'true') {
            extWhere += ` and OverWt > 0`
        }
        if (parseInt(req.query.vehicleGroup) > 0) {
            extWhere += ` and VehicleGroupID = ${req.query.vehicleGroup}`
        }
        if (req.query.isConfirm !== '') {
            extWhere += ` and IsConfirmed = ${str2bit(req.query.isConfirm)}`
        }
        const transports = await sequelize.query(`select Transport.TransportID as id, VehicleIn.StationID, TimeStampTx, Transport.TimeStampIn, Transport.TimeStampOut, (select CompanyName from Company where CompanyID = Transport.CompanyID) as CompanyName, (select Description from VehicleClass where VehicleClassID = Transport.VehicleClassID) as VehicleClassName, (select Description from VehicleGroup where VehicleGroupID = Transport.VehicleGroupID) as VehicleGroupName, F1M, (select ProvinceName from LPProvince where ProvinceID = Transport.F1MPID) as F1MPName, R1M, (select ProvinceName from LPProvince where ProvinceID = Transport.R1MPID) as R1MPName, VehicleOut.F2A, (select ProvinceName from LPProvince where ProvinceID = VehicleOut.F2APID) as F2APName, VehicleOut.R2A, (select ProvinceName from LPProvince where ProvinceID = VehicleOut.R2APID) as R2APName, (select ObjectiveDescription from Objective where ObjectiveID = Transport.ObjectiveID) as ObjectiveName, (select ProvinceName from TxProvince where ProvinceID = Transport.SrcProvinceID) as SrcProvinceName, (select ProvinceName from TxProvince where ProvinceID = Transport.DstProvinceID) as DstProvinceName, Transport.NoLoadWt, LoadWt, OverWt, IsConfirmed, VehicleIn.LaneID as VehInLaneID, VehicleIn.ImageRef as VehInImageRef, VehicleOut.LaneID as VehOutLaneID, VehicleOut.ImageRef as VehOutImageRef
        from Transport
        left join VehicleOut on Transport.VehicleOutID = VehicleOut.VehicleOutID
        left join VehicleIn on Transport.VehicleInID = VehicleIn.VehicleInID
        where Transport.StationID = ${req.query.station} and (Transport.TimeStampTx between '${req.query.startDateTime}' and '${req.query.endDateTime}') ${extWhere}
        order by Transport.TimeStampTx desc`, { type: QueryTypes.SELECT })
        res.status(200).send(transports)
    } catch (error) {
        next(error)
    }
}

exports.getVehicleIn = async (req, res, next) => {
    try {
        let extWhere = ``
        if (parseInt(req.query.company) > 0) {
            extWhere += ` and CompanyID = ${req.query.company}`
        }
        if (parseInt(req.query.inProvince) > 0) {
            extWhere += ` and SrcProvinceID = ${req.query.inProvince}`
        }
        if (parseInt(req.query.outProvince) > 0) {
            extWhere += ` and DstProvinceID = ${req.query.outProvince}`
        }
        if (parseInt(req.query.vehicleClass) > 0) {
            extWhere += ` and VehicleClassID = ${req.query.vehicleClass}`
        }
        if (parseInt(req.query.goodCategory) > 0) {
            const bitpower = Math.pow(2, parseInt(req.query.goodCategory) - 1)
            extWhere += ` and (((SrcGoods & ${bitpower}) = ${bitpower}) or ((DstGoods & ${bitpower}) = ${bitpower}))`
        }
        if (req.query.lp !== '') {
            extWhere += ` and ((VehicleIn.F1A like '%${req.query.lp}%') or (VehicleIn.R1A like '%${req.query.lp}%') or (VehicleIn.RFID like '%${req.query.lp}%'))`
        }
        if (req.query.isVehicleInStation === 'true') {
            extWhere += ` and TimeStampOut IS NULL`
        }
        if (req.query.isOverWeight === 'true') {
            extWhere += ` and OverWt > 0`
        }
        if (parseInt(req.query.vehicleGroup) > 0) {
            extWhere += ` and VehicleGroupID = ${req.query.vehicleGroup}`
        }
        if (req.query.isConfirm !== '') {
            extWhere += ` and IsConfirmed = ${str2bit(req.query.isConfirm)}`
        }
        const vehicles = await sequelize.query(`select VehicleIn.VehicleInID as id, VehicleIn.StationID, Transport.TimeStampTx, VehicleIn.TimeStampIn, VehicleOut.TimeStampOut, (select CompanyName from Company where CompanyID = Transport.CompanyID) as CompanyName, (select Description from VehicleClass where VehicleClassID = Transport.VehicleClassID) as VehicleClassName, (select Description from VehicleGroup where VehicleGroupID = Transport.VehicleGroupID) as VehicleGroupName, VehicleIn.F1A as F1M, (select ProvinceName from LPProvince where ProvinceID = VehicleIn.F1APID) as F1MPName, VehicleIn.R1A as R1M,  (select ProvinceName from LPProvince where ProvinceID = VehicleIn.R1APID) as R1MPName, VehicleOut.F2A, (select ProvinceName from LPProvince where ProvinceID = VehicleOut.F2APID) as F2APName, VehicleOut.R2A, (select ProvinceName from LPProvince where ProvinceID = VehicleOut.R2APID) as R2APName, (select ObjectiveDescription from Objective where ObjectiveID = Transport.ObjectiveID) as ObjectiveName, (select ProvinceName from TxProvince where ProvinceID = SrcProvinceID) as SrcProvinceName, (select ProvinceName from TxProvince where ProvinceID = DstProvinceID) as DstProvinceName, Transport.NoLoadWt, Transport.LoadWt, Transport.OverWt, IsConfirmed, VehicleIn.LaneID as VehInLaneID, VehicleIn.ImageRef as VehInImageRef, VehicleOut.LaneID as VehOutLaneID, VehicleOut.ImageRef as VehOutImageRef
        from VehicleIn
        left join Transport on VehicleIn.VehicleInID = Transport.VehicleInID
        left join VehicleOut on VehicleIn.VehicleInID = VehicleOut.VehicleInID
        where VehicleIn.StationID = ${req.query.station} and (VehicleIn.TimeStampIn between '${req.query.startDateTime}' and '${req.query.endDateTime}') ${extWhere}
        order by VehicleIn.TimeStampIn desc`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicles)
    } catch (error) {
        next(error)
    }
}

exports.getVehicleOut = async (req, res, next) => {
    try {
        let extWhere = ``
        if (parseInt(req.query.company) > 0) {
            extWhere += ` and CompanyID = ${req.query.company}`
        }
        if (parseInt(req.query.inProvince) > 0) {
            extWhere += ` and SrcProvinceID = ${req.query.inProvince}`
        }
        if (parseInt(req.query.outProvince) > 0) {
            extWhere += ` and DstProvinceID = ${req.query.outProvince}`
        }
        if (parseInt(req.query.vehicleClass) > 0) {
            extWhere += ` and VehicleClassID = ${req.query.vehicleClass}`
        }
        if (parseInt(req.query.goodCategory) > 0) {
            const bitpower = Math.pow(2, parseInt(req.query.goodCategory) - 1)
            extWhere += ` and (((SrcGoods & ${bitpower}) = ${bitpower}) or ((DstGoods & ${bitpower}) = ${bitpower}))`
        }
        if (req.query.lp !== '') {
            extWhere += ` and ((F2A like '%${req.query.lp}%') or (R2A like '%${req.query.lp}%') or (VehicleOut.RFID like '%${req.query.lp}%'))`
        }
        if (req.query.isVehicleInStation == true) {
            extWhere += ` and TimeStampOut IS NULL`
        }
        if (req.query.isOverWeight == true) {
            extWhere += ` and OverWt > 0`
        }
        if (parseInt(req.query.vehicleGroup) > 0) {
            extWhere += ` and VehicleGroupID = ${req.query.vehicleGroup}`
        }
        if (req.query.isConfirm !== '') {
            extWhere += ` and IsConfirmed = ${str2bit(req.query.isConfirm)}`
        }
        
        const vehicles = await sequelize.query(`select VehicleOut.VehicleOutID as id, VehicleOut.StationID, Transport.TransportID, TimeStampTx, VehicleIn.TimeStampIn, VehicleOut.TimeStampOut, (select CompanyName from Company where CompanyID = Transport.CompanyID) as CompanyName, (select Description from VehicleClass where VehicleClassID = Transport.VehicleClassID) as VehicleClassName, (select Description from VehicleGroup where VehicleGroupID = Transport.VehicleGroupID) as VehicleGroupName, (select ObjectiveDescription from Objective where ObjectiveID = Transport.ObjectiveID) as ObjectiveName, (select ProvinceName from TxProvince where ProvinceID = SrcProvinceID) as SrcProvinceName, (select ProvinceName from TxProvince where ProvinceID = DstProvinceID) as DstProvinceName, F1M, (select ProvinceName from LPProvince where ProvinceID = F1MPID) as F1MPName, R1M, (select ProvinceName from LPProvince where ProvinceID = R1MPID) as R1MPName, F2A, (select ProvinceName from LPProvince where ProvinceID = F2APID) as F2APName, R2A, (select ProvinceName from LPProvince where ProvinceID = R2APID) as R2APName, VehicleOut.GrossWt, Transport.NoLoadWt, LoadWt, Transport.MaxWt, OverWt, IsConfirmed, VehicleIn.LaneID as VehInLaneID, VehicleIn.ImageRef as VehInImageRef, VehicleOut.LaneID as VehOutLaneID, VehicleOut.ImageRef as VehOutImageRef
        from VehicleOut
        left join Transport on Transport.VehicleOutID = VehicleOut.VehicleOutID
        left join VehicleIn on VehicleIn.VehicleInID = VehicleOut.VehicleInID
        where VehicleOut.StationID = ${req.query.station} and (VehicleOut.TimeStampOut between '${req.query.startDateTime}' and '${req.query.endDateTime}') ${extWhere}
        order by VehicleOut.TimeStampOut desc`, { type: QueryTypes.SELECT })
        
        res.status(200).send(vehicles)
    } catch (error) {
        next(error)
    }
}