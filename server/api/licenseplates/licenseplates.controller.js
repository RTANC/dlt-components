const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getProvinces = async (req, res, next) => {
    try {
        const provinces = await sequelize.query("SELECT ProvinceID,ProvinceName FROM LPProvince where ProvinceID > 0 order by ProvinceName", { type: QueryTypes.SELECT });
        res.status(200).send(provinces)
    } catch (error) {
        next(error)
    }
}