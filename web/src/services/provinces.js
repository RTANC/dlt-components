import { api } from './api'

export function getProvinces() {
    return api.get('/provinces')
}