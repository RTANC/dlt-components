import{ api } from './api'
import { SQLDateTimeFormatter } from './utils'

export function getTransport(params) {
    return api.get('/query/transports?station=' + params.station + '&company=' + params.company + '&startDateTime=' + SQLDateTimeFormatter(params.startDateTime) + '&endDateTime=' + SQLDateTimeFormatter(params.endDateTime) + '&inProvince=' + params.inProvince + '&outProvince=' + params.outProvince + '&vehicleClass=' + params.vehicleClass + '&vehicleGroup=' + params.vehicleGroup + '&goodCategory=' + params.goodCategory + '&isConfirm=' + params.isConfirm + '&lp=' + params.lp + '&isVehicleInStation=' + params.isVehicleInStation + '&isOverWeight=' + params.isOverWeight)
}

export function getVehicleIn(params) {
    return api.get('/query/vehiclesIn?station=' + params.station + '&company=' + params.company + '&startDateTime=' + SQLDateTimeFormatter(params.startDateTime) + '&endDateTime=' + SQLDateTimeFormatter(params.endDateTime) + '&inProvince=' + params.inProvince + '&outProvince=' + params.outProvince + '&vehicleClass=' + params.vehicleClass + '&vehicleGroup=' + params.vehicleGroup + '&goodCategory=' + params.goodCategory + '&isConfirm=' + params.isConfirm + '&lp=' + params.lp + '&isVehicleInStation=' + params.isVehicleInStation + '&isOverWeight=' + params.isOverWeight)
}

export function getVehicleOut(params) {
    return api.get('/query/vehiclesOut?station=' + params.station + '&company=' + params.company + '&startDateTime=' + SQLDateTimeFormatter(params.startDateTime) + '&endDateTime=' + SQLDateTimeFormatter(params.endDateTime) + '&inProvince=' + params.inProvince + '&outProvince=' + params.outProvince + '&vehicleClass=' + params.vehicleClass + '&vehicleGroup=' + params.vehicleGroup + '&goodCategory=' + params.goodCategory + '&isConfirm=' + params.isConfirm + '&lp=' + params.lp + '&isVehicleInStation=' + params.isVehicleInStation + '&isOverWeight=' + params.isOverWeight)
}