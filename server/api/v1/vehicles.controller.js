const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getVehicleIn = async (req, res, next) => {
    try {
        // stations = ['พุทธมณฑล', 'คลองหลวง', 'ร่มเกล้า']
        const stations = await sequelize.query("SELECT * FROM station where StationID > 0", { type: QueryTypes.SELECT });
        res.status(200).send(stations)
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