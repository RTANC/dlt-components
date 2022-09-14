import { api } from './api'

export function getUserProfile() {
    return api.get('/profiles/')
}

export function updateUserProfile(user) {
    return api.patch('/profiles/', user)
}