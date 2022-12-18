const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getAgencies = async (req, res, next) => {
    try {
        const sql_query = `SELECT CompanyID, CompanyName
        FROM company
        where (StationID = ${req.query.station} or StationID = 0) and IsActive = 1
        order by CompanyID`
        const agencies = await sequelize.query(sql_query, { type: QueryTypes.SELECT });
        res.status(200).send(agencies)
    } catch (error) {
        next(error)
    }
}