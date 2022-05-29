import { api } from './api'

export function getVehicleClasses() {
    return api.get('/vehicles/classes')
}

export function getVehicleGroups() {
    return api.get('/vehicles/groups')
}