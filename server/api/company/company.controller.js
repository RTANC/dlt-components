const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')

exports.getCompany = async (req, res, next) => {
    try {
        let sql_query = ``
        if (req.userData.RoleID <= 1) {
            sql_query = `SELECT min(CompanyID) as CompanyID, CompanyName
            FROM company
            where (StationID = ${req.query.station} or StationID = 0) and IsActive = 1
            group by CompanyName
            order by CompanyID`
        } else if (req.userData.RoleID === 2) {
            sql_query = `SELECT min(CompanyID) as CompanyID, CompanyName
            FROM company
            where StationID = ${req.query.station} and IsActive = 1
            group by CompanyName
            order by CompanyID`
        } else if (req.userData.RoleID === 3) {
            sql_query = `SELECT min(CompanyID) as CompanyID, CompanyName
            FROM company
            where CompanyID > 0 and StationID = ${req.query.station} and IsActive = 1 and CompanyType = 1
            group by CompanyName
            order by CompanyName`
        }
        const company = await sequelize.query(sql_query, { type: QueryTypes.SELECT });
        res.status(200).send(company)
    } catch (error) {
        next(error)
    }
}