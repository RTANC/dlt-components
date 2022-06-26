const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')
const moment = require('moment-timezone')
exports.getProvinces = async (req, res, next) => {
    try {
        const provinces = await sequelize.query("SELECT * FROM TxProvince where ProvinceID > 0", { type: QueryTypes.SELECT });
        res.status(200).send(provinces)
    } catch (error) {
        next(error)
    }
}

exports.getLicensePlates = async (req, res, next) => {
    try {
        const licenseplates = []
        for (let i = 1; i <= 12;i+=3) {
            licenseplates.push({
                id: i,
                f1: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format',
                r1: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format',
                timeStampIn: moment().format('DD/MM/YYYY HH:mm:ss'),
                front: '6กฉ 7046  กรุงเทพมหานคร',
                rear: '6กฉ 7046  กรุงเทพมหานคร'
            })
            licenseplates.push({
                id: (i + 1),
                f1: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=164&h=164&fit=crop&auto=format',
                r1: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format',
                timeStampIn: moment().format('DD/MM/YYYY HH:mm:ss'),
                front: '61-7026  กรุงเทพมหานคร',
                rear: '61-7026  นครราชสีมา'
            })
            licenseplates.push({
                id: (i + 2),
                f1: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format',
                r1: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format',
                timeStampIn: moment().format('DD/MM/YYYY HH:mm:ss'),
                front: '1ฒย 704  กรุงเทพมหานคร',
                rear: 'ย-7046  ปทุมธานี'
            })
        }

        res.status(200).send(licenseplates)
    } catch (error) {
        next(error)
    }
}