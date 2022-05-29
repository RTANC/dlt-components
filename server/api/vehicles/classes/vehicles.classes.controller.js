const { QueryTypes } = require('sequelize');
const sequelize = require('../../../connection')

exports.getVehicleClasses = async (req, res, next) => {
    try {
        const vehicleClasses = await sequelize.query("SELECT * FROM VehicleClass", { type: QueryTypes.SELECT });
        res.status(200).send(vehicleClasses)
    } catch (error) {
        next(error)
    }
}