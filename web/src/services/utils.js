import moment from 'moment'
import CryptoJS from 'crypto-js'

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

export function hashMD5(str) {
    return CryptoJS.MD5(str).toString().toUpperCase()
}

export function getImageURL(stationId, laneId, dateTime, imageRef, ext) {
    if (stationId === null || laneId === null || !moment(dateTime).isValid() || imageRef === null) {
        return ''
    }
    let prefix = ''
    switch (laneId) {
        case 0: prefix = 'IN';
        break;
        case 1: prefix = 'OUT';
        break;
        case 2: prefix = 'IN';
        break;
        case 3: prefix = 'OUT';
        break;
    }

    let url = 'http://gcs.dlt.go.th/vehimages/' + stationId.toString() + '/' + laneId.toString() + '/' + (moment(dateTime).utc().format('YYYY/MM/DD')) + '/' + prefix + '/' + prefix + '-' + stationId.toString() + '-' + laneId.toString() + '-' + (moment(dateTime).utc().format('YYYYMMDD')) + '-' + imageRef + '-' + ext + '.jpg'

    return url
}

export function timeStayIn (timeStampIn, timeStampOut) {
    timeStampIn = moment(timeStampIn).utc()
    timeStampOut = moment(timeStampOut).utc()
    if (timeStampIn.isValid() && timeStampOut.isValid() && (timeStampOut.diff(timeStampIn) > 0)) {
        const hours = timeStampOut.diff(timeStampIn, 'hours')
        const minuts = timeStampOut.diff(timeStampIn, 'minutes')
        return  hours.toString() + ' ชม. ' +  (minuts - (hours * 60)).toString()  + ' นาที' 
    } else {
        if (timeStampIn.isValid()) {
            const now = moment().utc()
            const hours = now.diff(timeStampIn, 'hours')
            const minuts = now.diff(timeStampIn, 'minutes')
            return  hours.toString() + ' ชม. ' +  (minuts - (hours * 60)).toString()  + ' นาที' 
        } else {
            return '-'
        }
    }
}

export function SQLDateTimeFormatter(dateTime) {
    return moment(dateTime).format('YYYY-MM-DDTHH:mm:ss')
}

export function removeSQLTz (dtStr) {
    return dtStr.replace('.000Z', '')
}

export function str2bool (str) {
    return str === 'true' ? true : false
}

export function null2empty (str) {
    return str !== null ? str : ''
}

export function handleGoodCategoryCheck (values) {
    let sum = 0
    for (let i = 1;i < values.length;i++) {
        if (values[i]) {
            sum += Math.pow(2, (i-1))
        }
    }
    return sum
}

export function createQueryStr (obj) {
    const keys = Object.keys(obj)
    let queryStr = '?'
    for (let i = 0;i < keys.length;i++) {
        if (i === 0) {
            queryStr += keys[i] + '=' + (moment.isMoment(obj[keys[i]]) || moment.isDate(obj[keys[i]]) ? SQLDateTimeFormatter(obj[keys[i]]) : obj[keys[i]])
        } else if (i > 0) {
            queryStr += '&' + keys[i] + '=' + (moment.isMoment(obj[keys[i]]) || moment.isDate(obj[keys[i]]) ? SQLDateTimeFormatter(obj[keys[i]]) : obj[keys[i]])
        }
    }
    return queryStr
}