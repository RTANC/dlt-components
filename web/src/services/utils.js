import moment from 'moment'

export function passwordValidator (password) {
    const reg = new RegExp('^([A-Za-z0-9_+-]){8,}$')
    return reg.test(password)
}

export function emailValidator (password) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(password)
}

export function getKeyValue (obj) {
    const keys = Object.keys(obj)
    const target = Object.assign({}, obj)
    keys.forEach(k => {
        if (typeof obj[k].value !== 'undefined') {
            target[k] = obj[k].value
        }
    })
    return target
}

export function dateTimeFormatter(dateTime) {
    return moment(dateTime).utc().add(543, 'y').format('DD/MM/YYYY HH:mm:ss')
}

export function dateFormatter(date) {
    return moment(date).utc().add(543, 'y').format('DD/MM/YYYY')
}