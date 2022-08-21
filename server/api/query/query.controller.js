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
        const vehicles = await sequelize.query(`select *
        from VehicleIn
        inner join Transport on Transport.VehicleInID = VehicleIn.VehicleInID
        inner join VehicleOut on VehicleOut.VehicleInID = VehicleIn.VehicleInID
        where VehicleIn.StationID = ${req.query.station} and (VehicleIn.TimeStampIn between '${req.query.startDateTime}' and '${req.query.endDateTime}') ${extWhere}`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicles)
    } catch (error) {
        next(error)
    }
}

exports.getVehicleOut = async (req, res, next) => {
    try {
        let extWhere = ``
        const vehicles = await sequelize.query(`select *
        from VehicleOut
        inner join Transport on Transport.VehicleOutID = VehicleOut.VehicleOutID
        inner join VehicleIn on VehicleIn.VehicleInID = VehicleOut.VehicleInID
        where VehicleOut.StationID = ${req.query.station} and (VehicleOut.TimeStampOut between '2021-08-17T00:00:00' and '2021-08-17T23:59:00') ${extWhere}`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicles)
    } catch (error) {
        next(error)
    }
}