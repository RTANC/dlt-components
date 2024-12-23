const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')
const { isNULL } = require("../../utils/utils")

exports.getStatics = async (req, res, next) => {
    try {
        if (isNULL(req.body.DateWt)) {
            
        }
        const stations = await sequelize.query("SELECT * FROM station where StationID > 0", { type: QueryTypes.SELECT });
        res.status(200).send(stations)
    } catch (error) {
        next(error)
    }
}