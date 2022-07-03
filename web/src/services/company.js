import { api } from './api'

export function getCompany(stationId) {
    return api.get('/company?station=' + stationId)
}