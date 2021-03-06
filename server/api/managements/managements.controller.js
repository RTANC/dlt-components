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
        const sql_query = `select UserID as id, TitleID as title, FirstName as firstname, LastName as lastname, LoginName as username, RoleID as useRole, GCSUser.CompanyID as agency, Company.StationID as station, PhoneNo as tel, EmailAddress as email, GCSUser.IsActive as isActive
        from GCSUser
        inner join Company on GCSUser.CompanyID = Company.CompanyID
        where UserID = ${req.params.uid}`
        const user = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        res.status(200).send(user[0])
    } catch (error) {
        next(error)
    }
}

exports.getCompanies = async (req, res, next) => {
    try {
        const company = await sequelize.query(`select CompanyID as id, CompanyID as CompanyCode, CompanyID, StationName, CompanyName, TransportLicenseID, TransportTypeID, TransportScopeID
        from Company
        inner join Station on Company.StationID = Station.StationID
        where CompanyID > 3 and Company.StationID = ${req.query.station}`, { type: QueryTypes.SELECT })
        res.status(200).send(company)
    } catch (error) {
        next(error)
    }
}

exports.getCompany = async (req, res, next) => {
    try {
        const company = await sequelize.query(`select *
        from Company
        where CompanyID = ${req.params.companyId}`, { type: QueryTypes.SELECT })
        res.status(200).send(company[0])
    } catch (error) {
        next(error)
    }
}

exports.getG1Vehicles = async (req, res, next) => {
    try {
        let extWhere = ''
        if (!!req.query.company) {
            extWhere += ' and G1Vehicle.CompanyID = ' + req.query.company
        }
        if (!!req.query.text) {
            extWhere += ` and (FrontLP like '%${req.query.text}%' or RearLP like  '%${req.query.text}%')`
        }
        const vehicles = await sequelize.query(`SELECT id = ROW_NUMBER() OVER (order by EntryDate), G1VehicleID, EntryDate, Company.CompanyName, Description, CONCAT(FrontLP, ' ', ProvinceName) as FrontLP, CONCAT(RearLP, ' ', ProvinceName) as RearLP, G1Vehicle.IsActive
        FROM G1Vehicle
        inner join Company on G1Vehicle.CompanyID = Company.CompanyID
        inner join LPProvince on G1Vehicle.FrontLPPID = LPProvince.ProvinceID and G1Vehicle.RearLPPID = LPProvince.ProvinceID
        where G1Vehicle.StationID = ${req.query.station} ${extWhere}
        order by EntryDate`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicles)
    } catch (error) {
        next(error)
    }
}

exports.getG1Vehicle = async (req, res, next) => {
    try {
        const vehicle = await sequelize.query(`SELECT G1VehicleID, StationID, CompanyID, FrontLP, FrontLPPID, RearLP, RearLPPID, VehicleClassID, IsActive
        FROM G1Vehicle
        where G1VehicleID = ${req.params.id}`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicle[0])
    } catch (error) {
        next(error)
    }
}

exports.getG2Vehicles = async (req, res, next) => {
    try {
        let extWhere = ''
        if (!!req.query.company) {
            extWhere += ' and G2Vehicle.CompanyID = ' + req.query.company
        }
        if (!!req.query.text) {
            extWhere += ` and (FrontLP like '%${req.query.text}%' or RearLP like  '%${req.query.text}%')`
        }
        const vehicles = await sequelize.query(`SELECT id = ROW_NUMBER() OVER (order by EntryDate), G2VehicleID, EntryDate, Company.CompanyName, Description, CONCAT(FrontLP, ' ', ProvinceName) as FrontLP, CONCAT(RearLP, ' ', ProvinceName) as RearLP, G2Vehicle.IsActive
        FROM G2Vehicle
        inner join Company on G2Vehicle.CompanyID = Company.CompanyID
        inner join LPProvince on G2Vehicle.FrontLPPID = LPProvince.ProvinceID and G2Vehicle.RearLPPID = LPProvince.ProvinceID
        where G2Vehicle.StationID = ${req.query.station} ${extWhere}
        order by EntryDate`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicles)
    } catch (error) {
        next(error)
    }
}

exports.getG2Vehicle = async (req, res, next) => {
    try {
        const vehicle = await sequelize.query(`SELECT G2VehicleID, StationID, CompanyID, FrontLP, FrontLPPID, RearLP, RearLPPID, VehicleClassID, IsActive
        FROM G2Vehicle
        where G2VehicleID = ${req.params.id}`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicle[0])
    } catch (error) {
        next(error)
    }
}

exports.getG2VehicleRules = async (req, res, next) => {
    try {
        const rules = await sequelize.query(`select id = ROW_NUMBER() OVER (ORDER BY G2VehicleRule.StationID), G2VehicleRule.StationID, StationName, RuleDescription, TargetDate, UpdateTimeStamp, LoginName
        from G2VehicleRule
        inner join G2VehicleRuleDescription on G2VehicleRule.RuleID = G2VehicleRuleDescription.RuleID
        inner join Station on G2VehicleRule.StationID = Station.StationID
        inner join GCSUser on  G2VehicleRule.UserID = GCSUser.UserID`, { type: QueryTypes.SELECT })
        res.status(200).send(rules)
    } catch (error) {
        next(error)
    }
}

exports.getG2Rules = async (req, res, next) => {
    try {
        const rules = await sequelize.query(`select RuleID, RuleDescription
        from G2VehicleRuleDescription`, { type: QueryTypes.SELECT })
        res.status(200).send(rules)
    } catch (error) {
        next(error)
    }
}

exports.getG2Rule = async (req, res, next) => {
    try {
        const rules = await sequelize.query(`select StationID, RuleID
        from G2VehicleRule
        where StationID = ${req.params.station}`, { type: QueryTypes.SELECT })
        res.status(200).send(rules[0])
    } catch (error) {
        next(error)
    }
}

exports.getIncidents = async (req, res, next) => {
    try {
        const incidents = await sequelize.query(`select id = ROW_NUMBER() OVER (ORDER BY ID), ID, StartDt, EndDt, StationName, Title
        from Incident
        inner join Station on Incident.StationId = Station.StationID
        where Incident.StationId = ${req.query.station} AND (StartDt BETWEEN '${req.query.startDt}' AND '${req.query.endDt}') AND (EndDt BETWEEN '${req.query.startDt}' AND '${req.query.endDt}')`, { type: QueryTypes.SELECT })
        res.status(200).send(incidents)
    } catch (error) {
        next(error)
    }
}

exports.getIncident = async (req, res, next) => {
    try {
        const incident = await sequelize.query(`select ID, StartDt, EndDt, StationID, Title, Description, Remark
        from Incident
        where ID = ${req.params.id}`, { type: QueryTypes.SELECT })
        res.status(200).send(incident[0])
    } catch (error) {
        next(error)
    }
}