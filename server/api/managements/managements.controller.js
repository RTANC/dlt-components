const { QueryTypes } = require('sequelize');
const sequelize = require('../../connection')

exports.getUsers = async (req, res, next) => {
    try {
        if (!req.query.role || !req.query.station) {
            throw Error('roleId field and stationId field is require!')
        }
        let extWhere = ''
        if (!!req.query.company) {
            extWhere += ' and GCSUser.CompanyID = ' + req.query.company
        }
        if (!!req.query.text) {
            extWhere += ` and (FirstName like '%${req.query.text}%' or LastName like  '%${req.query.text}%' or LoginName like  '%${req.query.text}%')`
        }
        const sql_query = `select id = ROW_NUMBER() OVER (ORDER BY LoginName), UserID, LoginName,CONCAT(FirstName, ' ', LastName) as FullName, UserRole.Description as RoleName, Company.CompanyName, PhoneNo, EmailAddress, LastLogInDateTime, GCSUser.IsActive
        from GCSUser
        inner join Company
        on GCSUser.CompanyID = Company.CompanyID
        inner join UserRole
        on GCSUser.RoleID = UserRole.RoleID
        where GCSUser.RoleID = ${req.query.role} and StationID = ${req.query.station} ${extWhere}`
        const users = await sequelize.query(sql_query, { type: QueryTypes.SELECT });
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const sql_query = `select UserID as id, TitleID as title, FirstName as firstname, LastName as lastname, LoginName as username, RoleID as useRole, GCSUser.CompanyID as agency, Company.StationID as station, PhoneNo as tel, EmailAddress as email, GCSUser.IsActive
        from GCSUser 
        inner join Company on GCSUser.CompanyID = Company.CompanyID
        where UserID = ${req.params.uid}`
        const user = await sequelize.query(sql_query, { type: QueryTypes.SELECT });
        res.status(200).send(user[0])        
    } catch (error) {
        next(error)
    }
}