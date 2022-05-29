import { api } from './api'

export function getStations() {
    return api.get('/stations')
}