const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getProvinces = async (req, res, next) => {
    try {
        const provinces = await sequelize.query("SELECT * FROM TxProvince where ProvinceID > 0", { type: QueryTypes.SELECT });
        res.status(200).send(provinces)
    } catch (error) {
        next(error)
    }
}