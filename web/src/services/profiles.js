import { api } from './api'

export function getUserProfile(userId) {
    return api.get('/profiles/' + userId)
}

export function updateUserProfile(userId, user) {
    return api.patch('/profiles/' + userId, user)
}