const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')

exports.getCompany = async (req, res, next) => {
    try {
        const company = await sequelize.query("SELECT min(CompanyID) as CompanyID, CompanyName FROM company where CompanyID > 0 and StationID = " + req.query.station + " and IsActive = 1 and CompanyType = 1 group by CompanyName order by CompanyName", { type: QueryTypes.SELECT });
        res.status(200).send(company)
    } catch (error) {
        next(error)
    }
}