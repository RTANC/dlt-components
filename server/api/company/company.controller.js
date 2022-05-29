const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getCompany = async (req, res, next) => {
    try {
        // stations = ['พุทธมณฑล', 'คลองหลวง', 'ร่มเกล้า']
        const stations = await sequelize.query("SELECT * FROM company where CompanyID > 0", { type: QueryTypes.SELECT });
        res.status(200).send(stations)
    } catch (error) {
        next(error)
    }
}