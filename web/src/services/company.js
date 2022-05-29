import { api } from './api'

export function getCompany() {
    return api.get('/company')
}