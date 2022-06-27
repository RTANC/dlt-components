import { api } from './api'

export function getProvinces() {
    return api.get('/transports/provinces')
}

export function getLicensePlates(station, LPnumber) {
    return api.get('/transports/licenseplates?station=' + station + '&LPnumber=' + LPnumber)
}