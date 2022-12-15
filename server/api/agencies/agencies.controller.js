const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getAgencies = async (req, res, next) => {
    try {
        const agencies = await sequelize.query("SELECT CompanyID, CompanyName FROM company where StationID = " + req.query.station + " order by CompanyID", { type: QueryTypes.SELECT });
        res.status(200).send(agencies)
    } catch (error) {
        next(error)
    }
}