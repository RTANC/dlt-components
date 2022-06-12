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