import { api } from './api'

export function getAgencies(stationId) {
    return api.get('/agencies?station=' + stationId)
}