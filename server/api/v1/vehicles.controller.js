const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getVehicleIn = async (req, res, next) => {
    try {
        const resp = await sequelize.query(`select VehicleInID, TimeStampIn, LaneID, F1A, (select ProvinceName from LPProvince where ProvinceID = F1APID) [F1AProv], R1A, (select ProvinceName from LPProvince where ProvinceID = R1APID) [R1AProv], NULL [TransportID], NULL [VehicleOutID], StationID, ImageRef
            from VehicleIn
            where StationID = ${req.body.StationID} and TimeStampIn BETWEEN '${req.body.DateFrom}' AND '${req.body.DateTo}' and (F1A LIKE '%${req.body.LicPlate}%' OR R1A LIKE '%${req.body.LicPlate}%')`, { type: QueryTypes.SELECT });
        res.status(200).send(resp)
    } catch (error) {
        next(error)
    }
}

exports.getVehicleOut = async (req, res, next) => {
    try {
        // stations = ['พุทธมณฑล', 'คลองหลวง', 'ร่มเกล้า']
        const stations = await sequelize.query("SELECT * FROM station where StationID > 0", { type: QueryTypes.SELECT });
        res.status(200).send(stations)
    } catch (error) {
        next(error)
    }
}