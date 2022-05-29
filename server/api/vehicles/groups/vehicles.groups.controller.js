const { QueryTypes } = require('sequelize');
const sequelize = require('../../../connection')

exports.getVehicleGroups = async (req, res, next) => {
    try {
        const vehicleGroups = await sequelize.query("SELECT * FROM VehicleGroup", { type: QueryTypes.SELECT });
        res.status(200).send(vehicleGroups)
    } catch (error) {
        next(error)
    }
}