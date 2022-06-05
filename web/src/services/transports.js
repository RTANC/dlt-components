import { api } from './api'

export function getProvinces() {
    return api.get('transports/provinces')
}