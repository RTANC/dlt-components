const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const axios = require('axios')
const { saveImage, getImageRef, dateTimeSQLFormatter } = require("../../utils/utils")

exports.GetMissingList = async (req, res, next) => {
    try {
        let q = `?stationID=${req.query.stationID}&laneID=${req.query.laneID}`
        if (req.query.dateFrom) {
            q += `&dateFrom=${req.query.dateFrom}`
        }
        if (req.query.dateTo) {
            q += `&dateTo=${req.query.dateTo}`
        }
        const list = (await axios.get(`http://ip/gcs/api/gcsstation/GetMissingList${q}`)).data
        for (let i = 0;i < list.length;i++) {
            const {stationID, timeStamp, laneID, direction, frontLicensePlate, rearLicensePlate, weighingData, RFID} = list[i]
            const imageRef = await getImageRef(timeStamp, stationID, direction)
            saveImage(list[i], imageRef)
            if (direction === 'IN') {
                await sequelize.query(`insert into VehicleIn2(StationID, TimeStampIn, LaneID, F1A, F1APID, R1A, R1APID, ImageRef, RFID, CreateBy)
                values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}', '${RFID}', 2)`, { type: QueryTypes.INSERT })
            } else if (req.body.direction === 'OUT') {
                await sequelize.query(`insert into VehicleOut2(StationID, TimeStampOut, LaneID, F2A, F2APID, R2A, R2APID, ImageRef, GrossWt, NumAxles, Axle01, Axle02, Axle03, Axle04, Axle05, Axle06, Axle07, Axle08, Axle09, Axle10, RFID)
                values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}',${weighingData.totalWeight},${weighingData.numberOfAxles},${weighingData.weightOfAxle1},${weighingData.weightOfAxle2},${weighingData.weightOfAxle3},${weighingData.weightOfAxle4},${weighingData.weightOfAxle5},${weighingData.weightOfAxle6},${weighingData.weightOfAxle7},${weighingData.weightOfAxle8},${weighingData.weightOfAxle9},${weighingData.weightOfAxle10}, '${RFID}')`, { type: QueryTypes.INSERT })
            }
        }
        res.status(200).send('OK')
    } catch (error) {
        next(error)
    }
}

exports.GetMissingVehicleRecord = async (req, res, next) => {
    try {
        let q = `?stationID=${req.query.stationID}&laneID=${req.query.laneID}&seqID=${req.query.seqID}`
        const record = (await axios.get(`http://ip/gcs/api/gcsstation/GetMissingVehicleRecord${q}`)).data
        const {stationID, timeStamp, laneID, direction, frontLicensePlate, rearLicensePlate, weighingData, RFID} = record
        const imageRef = await getImageRef(timeStamp, stationID, direction)
        saveImage(record, imageRef)
        if (direction === 'IN') {
            await sequelize.query(`insert into VehicleIn2(StationID, TimeStampIn, LaneID, F1A, F1APID, R1A, R1APID, ImageRef, RFID, CreateBy)
            values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}', '${RFID}', 2)`, { type: QueryTypes.INSERT })
        } else if (req.body.direction === 'OUT') {
            await sequelize.query(`insert into VehicleOut2(StationID, TimeStampOut, LaneID, F2A, F2APID, R2A, R2APID, ImageRef, GrossWt, NumAxles, Axle01, Axle02, Axle03, Axle04, Axle05, Axle06, Axle07, Axle08, Axle09, Axle10, RFID)
            values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}',${weighingData.totalWeight},${weighingData.numberOfAxles},${weighingData.weightOfAxle1},${weighingData.weightOfAxle2},${weighingData.weightOfAxle3},${weighingData.weightOfAxle4},${weighingData.weightOfAxle5},${weighingData.weightOfAxle6},${weighingData.weightOfAxle7},${weighingData.weightOfAxle8},${weighingData.weightOfAxle9},${weighingData.weightOfAxle10}, '${RFID}')`, { type: QueryTypes.INSERT })
        }
        res.status(200).send('OK')
    } catch (error) {
        next(error)
    }
}

exports.opengate = async (req, res, next) => {
    try {
        res.status(200).send('OK')
    } catch (error) {
        next(error)
    }
}