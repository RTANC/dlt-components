const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('GCSDB', 'sa', 'rtanc1111100000', {
    host: 'localhost',
    dialect: 'mssql',
    dialectOptions: {
        requestTimeout: 300000
    }
})

module.exports = sequelize