const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const jwt = require('jsonwebtoken')

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body
        if ((typeof username === 'undefined' || username === '') || (typeof password === 'undefined' || password === '')) {
            throw Error('ชื่อผู้ใช้งาน หรือ รหัสผ่าน ต้องไม่เป็นค่าว่าง')
        }
        const user = await sequelize.query(`select UserID, RoleID, TitleID, LoginName
        from GCSUser
        where LoginPassword = '${password}' and LoginName = '${username}'`, { type: QueryTypes.SELECT })
        if (user.length < 1) {
            throw Error('ชื่อผู้ใช้งาน หรือ รหัสผ่าน ผิด')
        } else if (user.length === 1) {
            res.status(200).send(user[0])
        }
    } catch (error) {
        next(error)
    }
}