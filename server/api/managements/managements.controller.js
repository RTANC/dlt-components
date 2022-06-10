const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getUsers = async (req, res, next) => {
    try {
        const sql_query = `select id = ROW_NUMBER() OVER (ORDER BY LoginName), UserID, LoginName,CONCAT(FirstName, ' ', LastName) as FullName, UserRole.Description as RoleName, Company.CompanyName, PhoneNo, EmailAddress, LastLogInDateTime, GCSUser.IsActive
        from GCSUser
        left join Company
        on GCSUser.CompanyID = Company.CompanyID
        left join UserRole
        on GCSUser.RoleID = UserRole.RoleID`
        const users = await sequelize.query(sql_query, { type: QueryTypes.SELECT });
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}