const { QueryTypes } = require('sequelize');
const sequelize = require('../../../connection')

exports.getGoodsCategory = async (req, res, next) => {
    try {
        const goodsCategory = await sequelize.query("SELECT * FROM GoodsCategory", { type: QueryTypes.SELECT });
        res.status(200).send(goodsCategory)
    } catch (error) {
        next(error)
    }
}