import { api } from './api'

export function getProvinces() {
    return api.get('/transports/provinces')
}

export function getLicensePlates (station, LPnumber) {
    return api.get('/transports/licenseplates?station=' + station + '&LPnumber=' + LPnumber)
}

export function getTransport (id) {
    return api.get('/transports/' + id)
}

export function createTransport (transport) {
    return api.post('/transports/', transport)
}

export function updateTransport (id, transport) {
    return api.patch('/transports/' + id, transport)
}