import { api } from './api'
import moment from 'moment-timezone'

export function getUsers(roleId, stationId, companyId, text) {
    let query = ''
    if (!!companyId) {
        query += '&company=' + companyId
    }
    if (!!text) {
        query += '&text=' + text
    }
    return api.get('/managements/users?role=' + roleId +'&station=' + stationId + query)
}

export function getUser (userId) {
    return api.get('/managements/users/' + userId)
}

export function getCompanies (station) {
    return api.get('/managements/company?station=' + station)
}

export function getCompany (id) {
    return api.get('/managements/company/' + id)
}

export function getG1Vehicles (stationId, companyId, text) {
    let query = ''
    if (!!companyId) {
        query += '&company=' + companyId
    }
    if (!!text) {
        query += '&text=' + text
    }
    return api.get('/managements/G1/vehicles/?station=' + stationId + query)
}

export function getG1Vehicle (G1VehicleId) {
    return api.get('/managements/G1/vehicles/' + G1VehicleId)
}

export function getG2Vehicles (stationId, companyId, text) {
    let query = ''
    if (!!companyId) {
        query += '&company=' + companyId
    }
    if (!!text) {
        query += '&text=' + text
    }
    return api.get('/managements/G2/vehicles/?station=' + stationId + query)
}

export function getG2Vehicle (G2VehicleId) {
    return api.get('/managements/G2/vehicles/' + G2VehicleId)
}

export function getG2VehicleRules () {
    return api.get('/managements/G2/vehiclerules/')
}

export function getG2Rules () {
    return api.get('/managements/G2/rules/')
}

export function getG2Rule (stationId) {
    return api.get('/managements/G2/rules/' + stationId)
}

export function getIncidents (stationId, startDt, endDt) {
    return api.get('/managements/incidents?station=' + stationId + '&startDt=' + moment(startDt).format('YYYY-MM-DD HH:mm:ss') + '&endDt=' + moment(endDt).format('YYYY-MM-DD HH:mm:ss') )
}

export function getIncident (incidentId) {
    return api.get('/managements/incidents/' + incidentId)
}