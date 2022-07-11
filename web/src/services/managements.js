import { api } from './api'

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