const moment = require('moment')
const { QueryTypes } = require('sequelize')
const sequelize = require('../connection')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

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

exports.startBudgetYear = (dt) => {
    const y = moment(dt).year()
    return moment().set({'year': (y - 1), 'month': 9, 'date': 1, 'hour': 0, 'minute': 0, 'second': 0})
}

exports.endBudgetYear = (dt) => {
    const y = moment(dt).year()
    return moment().set({'year': y, 'month': 8, 'date': 30, 'hour': 23, 'minute': 59, 'second': 59})
}

exports.getBudgetYear = (dt) => {
    const y = moment(dt).year()
    const m = moment(dt).month()
    if (m >= 0 && m < 9) {
      return y + 543
    } else if (m >= 9 && m <= 11) {
      return y + 1 + 543
    }
}

exports.getImageRef = async (timeStamp, station, direction) => {
    try {
        let count
        if (direction === 'IN') {
            count = await sequelize.query(`select count (VehicleInID) as num FROM VehicleIn where StationID = ${station} and CAST(TimeStampIn as date) = '${this.dateSQLFormatter(timeStamp)}'`, { type: QueryTypes.SELECT })
        } else if (direction === 'OUT') {
            count = await sequelize.query(`select count (VehicleOutID) as num FROM VehicleOut where StationID = ${station} and CAST(TimeStampOut as date) = '${this.dateSQLFormatter(timeStamp)}'`, { type: QueryTypes.SELECT })
        }
        
        return (moment(timeStamp).format('HHmmss')) + '-' + (new Intl.NumberFormat('us', {minimumIntegerDigits: 5}).format((count[0].num)+1).replace(',', ''))
    } catch (error) {
        if (!(fs.existsSync('api/err_logs/'))) {
            fs.mkdirSync('api/err_logs/', { recursive: true })
        }
        fs.writeFile('api/err_logs/' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.txt', error.message, err => console.log(err))
        return null
    }
}

exports.saveImage = async (body, imageRef) => {
    try {
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
            case 4: prefix = 'OUT';
            break;
        }
    
        const PATH = path.join(process.env.SAVE_PATH, body.stationID.toString(), body.laneID.toString(), (moment(body.timeStamp).format('YYYY/MM/DD')), prefix)
        if (!(fs.existsSync(PATH))) {
            fs.mkdirSync(PATH, { recursive: true })
        }
    
        const imgName = prefix + '-' + body.stationID.toString() + '-' + body.laneID.toString() + '-' + (moment(body.timeStamp).format('YYYYMMDD')) + '-' + imageRef + '-'
    
        const buffFLP = Buffer.from(body.frontLicensePlate.ImageBase64 || '', 'base64')
        const buffRLP = Buffer.from(body.rearLicensePlate.ImageBase64 || '', 'base64')
        const buffFimg = Buffer.from(body.frontImageBase64 || '', 'base64')
        const buffRimg = Buffer.from(body.rearImageBase64 || '', 'base64')
    
        await sharp(buffFLP).resize({ width: 768 }).jpeg({ quality: 75 }).toFile(path.join(PATH, (imgName + '0' + '.jpg')))
        await sharp(buffRLP).resize({ width: 768 }).jpeg({ quality: 75 }).toFile(path.join(PATH, (imgName + '1' + '.jpg')))
        await sharp(buffFimg).resize({ width: 768 }).jpeg({ quality: 75 }).toFile(path.join(PATH, (imgName + '2' + '.jpg')))
        await sharp(buffRimg).resize({ width: 768 }).jpeg({ quality: 75 }).toFile(path.join(PATH, (imgName + '3' + '.jpg')))
        await sharp(buffRimg).resize({ width: 768 }).jpeg({ quality: 75 }).toFile(path.join(PATH, (imgName + '4' + '.jpg')))
    
        // fs.writeFile(path.join(PATH, (imgName + '0' + '.jpg')), body.frontLicensePlate.ImageBase64 || '', 'base64', err => console.log(err))
        // fs.writeFile(path.join(PATH, (imgName + '1' + '.jpg')), body.rearLicensePlate.ImageBase64 || '', 'base64', err => console.log(err))
        // fs.writeFile(path.join(PATH, (imgName + '2' + '.jpg')), body.frontImageBase64 || '', 'base64', err => console.log(err))
        // fs.writeFile(path.join(PATH, (imgName + '3' + '.jpg')), body.rearImageBase64 || '', 'base64', err => console.log(err))
    } catch (error) {
        console.log(error)
    }    
}

exports.dyTimePeriod = (dateTimeFrom, dateTimeTo) => {
    let period = []
    const d = moment(dateTimeTo).diff(moment(dateTimeFrom), 'hours', true)
    if (d < 0) {
      return []
    } else if (d >= 0 && d <= 1) {
      return [{ dateTimeFrom: dateTimeFrom, dateTimeTo: dateTimeTo }]
    } else if (d > 1) {
      period = [{ dateTimeFrom: dateTimeFrom, dateTimeTo: null }]
      for (let i = 0; i < Math.floor(d); i++) {
        period[i].dateTimeTo = moment(period[i].dateTimeFrom).add(1, 'h').subtract(1, 's')
        period.push({
          dateTimeFrom: moment(period[i].dateTimeTo).add(1, 's'),
          dateTimeTo: null,
        })
      }
    }
    period[Math.floor(d)].dateTimeTo = dateTimeTo
    return period
}