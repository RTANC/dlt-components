const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const moment = require('moment')

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await sequelize.query(`select UserID, RoleID, TitleID, LoginName, FirstName, LastName, PhoneNo, EmailAddress, GCSUser.CompanyID, StationID
        from GCSUser
        inner join Company on GCSUser.CompanyID = Company.CompanyID
        where UserID = ${req.userData.UserID}`, { type: QueryTypes.SELECT })
        res.status(200).send(user[0])
    } catch (error) {
        next(error)
    }
}

exports.updateUserProfile = async (req, res, next) => {
    try {
        let ext = ''
        if (typeof req.body.LoginPassword !== 'undefined') {
            ext += `, LoginPassword = '${req.body.LoginPassword}'`
        }
        await sequelize.query(`update GCSUser
        set TitleID = ${req.body.TitleID}, FirstName = '${req.body.FirstName}', LastName = '${req.body.LastName}', PhoneNo = '${req.body.PhoneNo || 'NULL'}', EmailAddress = '${req.body.EmailAddress.trim() || 'NULL'}', UpdatedDateTime = '${moment().format('YYYY-MM-DD HH:mm:ss')}' ${ext}
        where UserID = ${req.userData.UserID}`, { type: QueryTypes.UPDATE })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}