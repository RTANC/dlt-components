const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getCompany = async (req, res, next) => {
    try {
        const company = await sequelize.query("SELECT CompanyID, CompanyName FROM company where CompanyID > 0", { type: QueryTypes.SELECT });
        res.status(200).send(company)
    } catch (error) {
        next(error)
    }
}