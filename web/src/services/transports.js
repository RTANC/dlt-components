import { api } from './api'

export function getProvinces() {
    return api.get('/transports/provinces')
}

export function getLicensePlates() {
    return api.get('/transports/licenseplates')
}