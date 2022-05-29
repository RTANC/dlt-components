import { api } from './api'

export function getGoodCategory() {
    return api.get('/goods/category')
}