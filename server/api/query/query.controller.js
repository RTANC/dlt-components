const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

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
        if (typeof req.query.lp !== 'undefined') {
            extWhere += ` and ((F1M like '%${req.query.lp}%') or (R1M like '%${req.query.lp}%'))`
        }
        if (req.query.isVehicleInStation === 'true') {
            extWhere += ` and TimeStampOut IS NULL`
        }
        if (req.query.isOverWeight === 'true') {
            extWhere += ` and OverWt > 0`
        }
        if (parseInt(req.query.vehicleGroup) > 0) {
            extWhere += `and VehicleGroupID = ${req.query.vehicleGroup}`
        }
        if (typeof req.query.isConfirm !== 'undefined') {
            extWhere += `and IsConfirmed = ${req.query.isConfirm === 'true' ? 1 : 0}`
        }
        const transports = await sequelize.query(`select *
        from Transport
        where StationID = ${req.query.station} and (TimeStampTx between '${req.query.startDateTime}' and '${req.query.endDateTime}') ${extWhere}`, { type: QueryTypes.SELECT })
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
        if (typeof req.query.lp !== 'undefined') {
            extWhere += ` and ((F1M like '%${req.query.lp}%') or (R1M like '%${req.query.lp}%'))`
        }
        if (req.query.isVehicleInStation === 'true') {
            extWhere += ` and TimeStampOut IS NULL`
        }
        if (req.query.isOverWeight === 'true') {
            extWhere += ` and OverWt > 0`
        }
        if (parseInt(req.query.vehicleGroup) > 0) {
            extWhere += `and VehicleGroupID = ${req.query.vehicleGroup}`
        }
        if (typeof req.query.isConfirm !== 'undefined') {
            extWhere += `and IsConfirmed = ${req.query.isConfirm === 'true' ? 1 : 0}`
        }
        const vehicles = await sequelize.query(`select Transport.TimeStampTx, Transport.TimeStampIn, Transport.TimeStampOut, CompanyName, VehicleClass.Description, VehicleGroup.Description, VehicleIn.F1A as F1M, (select ProvinceName from LPProvince where ProvinceID = VehicleIn.F1APID) as F1MPName, VehicleIn.R1A as R1M,  (select ProvinceName from LPProvince where ProvinceID = VehicleIn.R1APID) as R1MPName, VehicleOut.F2A, (select ProvinceName from LPProvince where ProvinceID = VehicleOut.F2APID) as F2APName, VehicleOut.R2A, (select ProvinceName from LPProvince where ProvinceID = VehicleOut.R2APID) as R2APName, ObjectiveDescription, (select ProvinceName from TxProvince where ProvinceID = SrcProvinceID) as SrcProvinceName, (select ProvinceName from TxProvince where ProvinceID = DstProvinceID) as DstProvinceName, Transport.NoLoadWt, Transport.LoadWt, Transport.OverWt, IsConfirmed
        from VehicleIn
        inner join Transport on VehicleIn.VehicleInID = Transport.VehicleInID
        inner join VehicleOut on VehicleIn.VehicleInID = VehicleOut.VehicleInID
        inner join Company on Company.CompanyID = Transport.CompanyID
        inner join VehicleClass on VehicleClass.VehicleClassID = Transport.VehicleClassID
        inner join VehicleGroup on VehicleGroup.VehicleGroupID = VehicleIn.VehicleGroupID
        where VehicleIn.StationID = ${req.query.station} and (VehicleIn.TimeStampIn between '${req.query.startDateTime}' and '${req.query.endDateTime}') ${extWhere}`, { type: QueryTypes.SELECT })
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
            extWhere += ` and ((F1M like '%${req.query.lp}%') or (R1M like '%${req.query.lp}%'))`
        }
        if (req.query.isVehicleInStation == true) {
            extWhere += ` and TimeStampOut IS NULL`
        }
        if (req.query.isOverWeight == true) {
            extWhere += ` and OverWt > 0`
        }
        if (parseInt(req.query.vehicleGroup) > 0) {
            extWhere += `and VehicleGroupID = ${req.query.vehicleGroup}`
        }
        if (req.query.isConfirm !== '') {
            extWhere += ` and IsConfirmed = ${req.query.isConfirm === 'true' ? 1 : 0}`
        }
        
        const vehicles = await sequelize.query(`select VehicleOut.VehicleOutID as id, Transport.TransportID, TimeStampTx, VehicleIn.TimeStampIn, VehicleOut.TimeStampOut, (select CompanyName from Company where CompanyID = Transport.CompanyID) as CompanyName, (select Description from VehicleClass where VehicleClassID = Transport.VehicleClassID) as VehicleClassName, (select Description from VehicleGroup where VehicleGroupID = Transport.VehicleGroupID) as VehicleGroupName, (select ObjectiveDescription from Objective where ObjectiveID = Transport.ObjectiveID) as ObjectiveName, (select ProvinceName from TxProvince where ProvinceID = SrcProvinceID) as SrcProvinceName, (select ProvinceName from TxProvince where ProvinceID = DstProvinceID) as DstProvinceName, F1M, (select ProvinceName from LPProvince where ProvinceID = F1MPID) as F1MPName, R1M, (select ProvinceName from LPProvince where ProvinceID = R1MPID) as R1MPName, F2A, (select ProvinceName from LPProvince where ProvinceID = F2APID) as F2APName, R2A, (select ProvinceName from LPProvince where ProvinceID = R2APID) as R2APName, VehicleOut.GrossWt, Transport.NoLoadWt, LoadWt, Transport.MaxWt, OverWt, IsConfirmed, VehicleIn.LaneID as VehInLaneID, VehicleIn.ImageRef as VehInImageRef, VehicleOut.LaneID as VehOutLaneID, VehicleOut.ImageRef as VehOutImageRef
        from VehicleOut
        inner join Transport on Transport.VehicleOutID = VehicleOut.VehicleOutID
        inner join VehicleIn on VehicleIn.VehicleInID = VehicleOut.VehicleInID
        where VehicleOut.StationID = ${req.query.station} and (VehicleOut.TimeStampOut between '${req.query.startDateTime}' and '${req.query.endDateTime}') ${extWhere}`, { type: QueryTypes.SELECT })
        
        console.log(req.query.isConfirm);
        res.status(200).send(vehicles)
    } catch (error) {
        next(error)
    }
}