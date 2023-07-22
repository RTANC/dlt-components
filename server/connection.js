const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_URL,
    dialect: 'mssql',
    port: process.env.DB_PORT,
    dialectOptions: {
        options: { requestTimeout: 0, encrypt: false }
    }
})

module.exports = sequelize