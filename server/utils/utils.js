const moment = require('moment')
const { QueryTypes } = require('sequelize')
const sequelize = require('../connection')
const fs = require('fs')
const glob = require('glob')

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

exports.saveImage = (body) => {
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

    let path = 'public/vehimages/' + body.stationID.toString() + '/' + body.laneID.toString() + '/' + (moment(body.timeStamp).utc().format('YYYY/MM/DD')) + '/'
    if (!(fs.existsSync(path + '/' + prefix))) {
        fs.mkdirSync(path + '/' + prefix, { recursive: true })
    }
    // calculate image ref before save
    glob(path + '*/*.jpg', function(error, files) {
        const count = files.length + 1
        const imageRef = (moment(body.timeStamp).utc().format('HHmmss')) + '-' + (new Intl.NumberFormat('us', {minimumIntegerDigits: 5}).format(count).replace(',', ''))
        const imgPath = path + prefix + '/' + prefix + '-' + body.stationID.toString() + '-' + body.laneID.toString() + '-' + (moment(body.timeStamp).utc().format('YYYYMMDD')) + '-' + imageRef
        
        fs.writeFile(imgPath + '-' + 0 + '.jpg', body.frontLicensePlate.ImageBase64 || '', 'base64', err => console.log(err))
        fs.writeFile(imgPath + '-' + 1 + '.jpg', body.rearLicensePlate.ImageBase64 || '', 'base64', err => console.log(err))
        fs.writeFile(imgPath + '-' + 2 + '.jpg', body.frontImageBase64 || '', 'base64', err => console.log(err))
        fs.writeFile(imgPath + '-' + 3 + '.jpg', body.rearImageBase64 || '', 'base64', err => console.log(err))
    })
    
}