const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const moment = require('moment')
const { bool2bit } = require('../../utils/utils')

exports.getUsers = async (req, res, next) => {
    try {
        if (!req.query.role || !req.query.station) {
            throw Error('roleId field and stationId field is require!')
        }
        let extWhere = ''
        if (parseInt(req.query.role) < 0) {
            extWhere += ''
            req.query.station = 0
        } else {
            if (parseInt(req.query.role) < 2) {
                req.query.station = 0
            }
            extWhere += ` and GCSUser.RoleID = ${req.query.role}`
        }
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
        where StationID = ${req.query.station} ${extWhere}`
        const users = await sequelize.query(sql_query, { type: QueryTypes.SELECT });
        res.status(200).send(users)
    } catch (error) {
        next(error)
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const sql_query = `select UserID as id, TitleID as title, FirstName as firstname, LastName as lastname, LoginName as username, RoleID as userRole, GCSUser.CompanyID as agency, Company.StationID as station, PhoneNo as tel, EmailAddress as email, GCSUser.IsActive as isActive
        from GCSUser
        inner join Company on GCSUser.CompanyID = Company.CompanyID
        where UserID = ${req.params.uid}`
        const user = await sequelize.query(sql_query, { type: QueryTypes.SELECT })
        res.status(200).send(user[0])
    } catch (error) {
        next(error)
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const {title, userRole, agency, firstname, lastname, username, newPassword, email, tel, isActive} = req.body
        await sequelize.query(`insert GCSUser(CompanyID, RoleID, LoginName, LoginPassword, TitleID, FirstName, LastName, PhoneNo, EmailAddress, IsActive, IsForceChangePassword, CreatedDateTime)
        values(${(parseInt(userRole) === 0 || parseInt(userRole) === 1) ? 0 : agency}, ${userRole}, '${username}', '${newPassword}', ${title}, '${firstname}', '${lastname}', '${tel}', '${email}', ${isActive ? 1 : 0}, 1, '${moment().format('YYYY-MM-DD HH:mm:ss')}')`, { type: QueryTypes.INSERT })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        let ext = ''
        const {title, userRole, agency, firstname, lastname, username, newPassword, email, tel, isActive} = req.body
        if (typeof newPassword !== 'undefined') {
           ext +=  `, LoginPassword = '${newPassword}'`
        }
        await sequelize.query(`update GCSUser
        set CompanyID = ${agency}, RoleID = ${userRole}, LoginName = '${username}', TitleID = ${title}, FirstName = '${firstname}', LastName = '${lastname}', PhoneNo = '${tel}', EmailAddress = '${email}', IsActive = ${isActive ? 1 : 0}, UpdatedDateTime = '${moment().format('YYYY-MM-DD HH:mm:ss')}' ${ext}
        where UserID = ${req.params.id}`, { type: QueryTypes.UPDATE })
        res.sendStatus(201)
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

exports.createCompany = async (req, res, next) => {
    try {
        const { station, companyName, taxId, transportType, transportScope, transportLicense, isActive} = req.body
        await sequelize.query(`INSERT Company(StationID, CompanyName, TaxID, TransportTypeID, TransportScopeID, TransportLicenseID, IsActive, CompanyType)
        VALUES(${station}, '${companyName}', '${taxId}', ${transportType || 'NULL'}, ${transportScope || 'NULL'}, '${transportLicense || 'NULL'}', ${bool2bit(isActive)}, 1)`, { type: QueryTypes.INSERT })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.updateCompany = async (req, res, next) => {
    try {
        const { transportType, transportScope, transportLicense, isActive } = req.body
        await sequelize.query(`update Company
        set TransportTypeID = ${transportType}, TransportScopeID = ${transportScope}, TransportLicenseID = '${transportLicense}', IsActive = ${bool2bit(isActive)}
        where CompanyID = ${req.params.companyId}`, { type: QueryTypes.UPDATE })
        res.sendStatus(201)
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
        const vehicles = await sequelize.query(`SELECT id = ROW_NUMBER() OVER (order by EntryDate), G1VehicleID, EntryDate, Company.CompanyName, VehicleClass.Description, CONCAT(FrontLP, ' ', ProvinceName) as FrontLP, CONCAT(RearLP, ' ', ProvinceName) as RearLP, G1Vehicle.IsActive
        FROM G1Vehicle
        inner join Company on G1Vehicle.CompanyID = Company.CompanyID
        inner join LPProvince on G1Vehicle.FrontLPPID = LPProvince.ProvinceID and G1Vehicle.RearLPPID = LPProvince.ProvinceID
        inner join VehicleClass on G1Vehicle.VehicleClassID = VehicleClass.VehicleClassID
        where G1Vehicle.StationID = ${req.query.station} ${extWhere}
        order by EntryDate desc`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicles)
    } catch (error) {
        next(error)
    }
}

exports.getG1Vehicle = async (req, res, next) => {
    try {
        const vehicle = await sequelize.query(`SELECT G1VehicleID, StationID, CompanyID, FrontLP, FrontLPPID, RearLP, RearLPPID, VehicleClassID, IsActive, RFID
        FROM G1Vehicle
        where G1VehicleID = ${req.params.id}`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicle[0])
    } catch (error) {
        next(error)
    }
}

exports.createG1Vehicle = async (req, res, next) => {
    try {
        const {station, company, vehicleClass, frontLP, frontLPProvince, rearLP, rearLPProvince, rfid, isActive} = req.body
        await sequelize.query(`insert G1Vehicle(StationID, CompanyID, FrontLP, FrontLPPID, RearLP, RearLPPID, VehicleClassID, EntryDate, IsActive, RFID)
        values(${station}, ${company}, '${frontLP}', ${frontLPProvince}, '${rearLP}', ${rearLPProvince}, ${vehicleClass}, '${moment().format('YYYY-MM-DD HH:mm:ss')}', ${bool2bit(isActive)}, '${rfid}')`, { type: QueryTypes.INSERT })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.updateG1Vehicle = async (req, res, next) => {
    try {
        const {station, company, vehicleClass, frontLP, frontLPProvince, rearLP, rearLPProvince, rfid, isActive} = req.body
        await sequelize.query(`update G1Vehicle
        set StationID = ${station}, CompanyID = ${company}, FrontLP = '${frontLP}', FrontLPPID = ${frontLPProvince}, RearLP = '${rearLP}', RearLPPID = ${rearLPProvince}, VehicleClassID = ${vehicleClass}, IsActive = ${bool2bit(isActive)}, RFID = '${rfid}'
        where G1VehicleID = ${req.params.id}`, { type: QueryTypes.UPDATE })
        res.sendStatus(201)
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
        const vehicles = await sequelize.query(`SELECT id = ROW_NUMBER() OVER (order by EntryDate), G2VehicleID, EntryDate, Company.CompanyName, VehicleClass.Description, CONCAT(FrontLP, ' ', ProvinceName) as FrontLP, CONCAT(RearLP, ' ', ProvinceName) as RearLP, G2Vehicle.IsActive
        FROM G2Vehicle
        inner join Company on G2Vehicle.CompanyID = Company.CompanyID
        inner join LPProvince on G2Vehicle.FrontLPPID = LPProvince.ProvinceID and G2Vehicle.RearLPPID = LPProvince.ProvinceID
        inner join VehicleClass on G2Vehicle.VehicleClassID = VehicleClass.VehicleClassID
        where G2Vehicle.StationID = ${req.query.station} ${extWhere}
        order by EntryDate desc`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicles)
    } catch (error) {
        next(error)
    }
}

exports.getG2Vehicle = async (req, res, next) => {
    try {
        const vehicle = await sequelize.query(`SELECT G2VehicleID, StationID, CompanyID, FrontLP, FrontLPPID, RearLP, RearLPPID, VehicleClassID, IsActive, RFID
        FROM G2Vehicle
        where G2VehicleID = ${req.params.id}`, { type: QueryTypes.SELECT })
        res.status(200).send(vehicle[0])
    } catch (error) {
        next(error)
    }
}


exports.createG2Vehicle = async (req, res, next) => {
    try {
        const {station, company, vehicleClass, frontLP, frontLPProvince, rearLP, rearLPProvince, isActive, rfid} = req.body
        await sequelize.query(`insert G2Vehicle(StationID, CompanyID, FrontLP, FrontLPPID, RearLP, RearLPPID, VehicleClassID, EntryDate, IsActive, RFID)
        values(${station}, ${company}, '${frontLP}', ${frontLPProvince}, '${rearLP}', ${rearLPProvince}, ${vehicleClass}, '${moment().format('YYYY-MM-DD HH:mm:ss')}', ${bool2bit(isActive)}, '${rfid}')`, { type: QueryTypes.INSERT })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.updateG2Vehicle = async (req, res, next) => {
    try {
        const {station, company, vehicleClass, frontLP, frontLPProvince, rearLP, rearLPProvince, isActive, rfid} = req.body
        await sequelize.query(`update G2Vehicle
        set StationID = ${station}, CompanyID = ${company}, FrontLP = '${frontLP}', FrontLPPID = ${frontLPProvince}, RearLP = '${rearLP}', RearLPPID = ${rearLPProvince}, VehicleClassID = ${vehicleClass}, IsActive = ${bool2bit(isActive)}, RFID = '${rfid}'
        where G2VehicleID = ${req.params.id}`, { type: QueryTypes.UPDATE })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.getG2VehicleRules = async (req, res, next) => {
    try {
        const rules = await sequelize.query(`select id = ROW_NUMBER() OVER (ORDER BY G2VehicleRule.StationID), G2VehicleRule.StationID, G2VehicleRule.RuleID, StationName, RuleDescription, TargetDate, UpdateTimeStamp, LoginName
        from G2VehicleRule
        inner join G2VehicleRuleDescription on G2VehicleRule.RuleID = G2VehicleRuleDescription.RuleID
        inner join Station on G2VehicleRule.StationID = Station.StationID
        inner join GCSUser on  G2VehicleRule.UserID = GCSUser.UserID`, { type: QueryTypes.SELECT })
        res.status(200).send(rules)
    } catch (error) {
        next(error)
    }
}

exports.getG2VehicleRule = async (req, res, next) => {
    try {
        const rules = await sequelize.query(`select StationID, RuleID
        from G2VehicleRule
        where StationID = ${req.params.station}`, { type: QueryTypes.SELECT })
        res.status(200).send(rules[0])
    } catch (error) {
        next(error)
    }
}

exports.updateG2VehicleRule = async (req, res, next) => {
    try {
        await sequelize.query(`update G2VehicleRule
        set RuleID = ${req.body.rule}, UserID = 1, UpdateTimeStamp = '${moment().format('YYYY-MM-DD HH:mm:ss')}'
        where StationID = ${req.params.station}`, { type: QueryTypes.UPDATE })
        res.sendStatus(201)
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

exports.createIncident = async (req, res, next) => {
    try {
        const {station, startDate, endDate, title, description, remark} = req.body
        await sequelize.query(`insert into Incident(StartDt, EndDt, StationId, Title, Description, Remark)
        values('${moment(startDate).format('YYYY-MM-DD HH:mm:ss')}','${moment(endDate).format('YYYY-MM-DD HH:mm:ss')}','${station}','${title}','${description}','${remark}')`, { type: QueryTypes.INSERT })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.updateIncident = async (req, res, next) => {
    try {
        const {station, startDate, endDate, title, description, remark} = req.body
        await sequelize.query(`UPDATE Incident
        SET StartDt = '${moment(startDate).format('YYYY-MM-DD HH:mm:ss')}', EndDt = '${moment(endDate).format('YYYY-MM-DD HH:mm:ss')}', StationId = '${station}', Title = '${title}', Description = '${description}', Remark = '${remark}'
        WHERE ID = ${req.params.id}`, { type: QueryTypes.UPDATE })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
}

exports.deleteIncident = async (req, res, next) => {
    try {
        await sequelize.query(`delete Incident
        where ID = ${req.params.id}`, { type: QueryTypes.DELETE })
        res.sendStatus(204)
    } catch (error) {
        next(error)
    }
}