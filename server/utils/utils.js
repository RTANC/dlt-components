const moment = require('moment')
const { QueryTypes } = require('sequelize')
const sequelize = require('../connection')
const fs = require('fs')

exports.bool2bit = (bool) => {
    return bool ? 1 : 0
}

exports.str2bit = (str) => {
    return str === 'true' ? 1 : 0
}

exports.getDateTimeNow = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

exports.reportDateTimeFormatter = (dt) => {
    return (new Date(dt).toLocaleDateString('th-TH', {day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'})) + ' น.'
}

exports.getStationName = async (id) => {
    try {
        const station = await sequelize.query(`SELECT StationName FROM station where StationID = ${id}`, { type: QueryTypes.SELECT })
        return station[0].StationName
    } catch (error) {
        return error.message
    }
}

exports.dateTimeSQLFormatter = (dt) => {
    return moment(dt).format('YYYY-MM-DDTHH:mm:ss')
}

exports.dateSQLFormatter = (dt) => {
    return moment(dt).format('YYYY-MM-DD')
} 

exports.getImageRef = async (timeStamp, station, direction) => {
    try {
        let count
        if (direction === 'in') {
            count = await sequelize.query(`select count (VehicleInID) as num FROM VehicleIn where StationID = ${station} and CAST(TimeStampIn as date) = '${this.dateSQLFormatter(timeStamp)}'`, { type: QueryTypes.SELECT })
        } else if (direction === 'out') {
            count = await sequelize.query(`select count (VehicleOutID) as num FROM VehicleOut where StationID = ${station} and CAST(TimeStampOut as date) = '${this.dateSQLFormatter(timeStamp)}'`, { type: QueryTypes.SELECT })
        }
        
        return (moment(timeStamp).format('HHmmss')) + '-' + (new Intl.NumberFormat('us', {minimumIntegerDigits: 5}).format((count[0].num)+1).replace(',', ''))
    } catch (error) {
        return null
    }
}

exports.saveImage = (body, imageRef) => {
    //ext = 0 = LP front, 1 = LP rear, 2 = front view, 3 = rear view
    let prefix = ''
    switch (body.laneID) {
        case 0: prefix = 'IN';
        break;
        case 1: prefix = 'OUT';
        break;
        case 2: prefix = 'IN';
        break;
        case 3: prefix = 'OUT';
        break;
    }

    const path = 'D:/public/vehimages/' + body.stationID.toString() + '/' + body.laneID.toString() + '/' + (moment(body.timeStamp).utc().format('YYYY/MM/DD')) + '/' + prefix + '/'
    if (!(fs.existsSync(path))) {
        fs.mkdirSync(path, { recursive: true })
    }

    imgPath = path + prefix + '-' + imageRef

    fs.writeFile(imgPath + '-' + 0 + '.jpg', body.frontLicensePlate.ImageBase64 || '', 'base64', err => console.log(err))
    fs.writeFile(imgPath + '-' + 1 + '.jpg', body.rearLicensePlate.ImageBase64 || '', 'base64', err => console.log(err))
    fs.writeFile(imgPath + '-' + 2 + '.jpg', body.frontImageBase64 || '', 'base64', err => console.log(err))
    fs.writeFile(imgPath + '-' + 3 + '.jpg', body.rearImageBase64 || '', 'base64', err => console.log(err))
    
}