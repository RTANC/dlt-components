import { api } from './api'

export function logins (data) {
    return api.post('/logins/', data)
}