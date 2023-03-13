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
        const list = (await axios.get(`http://192.168.238.72/gcs/api/gcsstation/GetMissingList${q}`, { headers: { ApiKey: req.query.ApiKey } })).data
        for (let i = 0;i < list.length;i++) {
            const {stationID, timeStamp, laneID, direction, frontLicensePlate, rearLicensePlate, weighingData, RFID} = list[i]
            const imageRef = await getImageRef(timeStamp, stationID, direction)
            await saveImage(list[i], imageRef)
            if (direction === 'IN') {
                const rows = await sequelize.query(`update VehicleIn
                set F1A = '${frontLicensePlate.plateNumber}', F1APID = ${frontLicensePlate.provinceID}, R1A = '${rearLicensePlate.plateNumber}', R1APID = ${rearLicensePlate.provinceID}, ImageRef = '${imageRef}', RFID = '${RFID}', CreateBy = 2
                where StationID = ${stationID} and TimeStampIn = '${dateTimeSQLFormatter(timeStamp)}' and LaneID = ${laneID}`, { type: QueryTypes.UPDATE })
                if (rows[1] === 0) {
                    await sequelize.query(`insert into VehicleIn(StationID, TimeStampIn, LaneID, F1A, F1APID, R1A, R1APID, ImageRef, RFID, CreateBy)
                    values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}', '${RFID}', 2)`, { type: QueryTypes.INSERT })
                }
            } else if (req.body.direction === 'OUT') {
                const rows = await sequelize.query(`update VehicleOut
                set F2A = '${frontLicensePlate.plateNumber}', F2APID = ${frontLicensePlate.provinceID}, R2A = '${rearLicensePlate.plateNumber}', R2APID = ${rearLicensePlate.provinceID}, ImageRef = '${imageRef}', GrossWt = ${weighingData.totalWeight}, NumAxles = ${weighingData.numberOfAxles}, Axle01 = ${weighingData.weightOfAxle1}, Axle02 = ${weighingData.weightOfAxle2}, Axle03 = ${weighingData.weightOfAxle3}, Axle04 = ${weighingData.weightOfAxle4}, Axle05 = ${weighingData.weightOfAxle5}, Axle06 = ${weighingData.weightOfAxle6}, Axle07 = ${weighingData.weightOfAxle7}, Axle08 = ${weighingData.weightOfAxle8}, Axle09 = ${weighingData.weightOfAxle9}, Axle10 = ${weighingData.weightOfAxle10}, RFID = '${RFID}', CreateBy = 2
                where StationID = ${stationID} and TimeStampOut = '${dateTimeSQLFormatter(timeStamp)}' and LaneID = ${laneID}`, { type: QueryTypes.UPDATE })
                if (rows[1] === 0) {
                    await sequelize.query(`insert into VehicleOut(StationID, TimeStampOut, LaneID, F2A, F2APID, R2A, R2APID, ImageRef, GrossWt, NumAxles, Axle01, Axle02, Axle03, Axle04, Axle05, Axle06, Axle07, Axle08, Axle09, Axle10, RFID, CreateBy)
                    values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}',${weighingData.totalWeight},${weighingData.numberOfAxles},${weighingData.weightOfAxle1},${weighingData.weightOfAxle2},${weighingData.weightOfAxle3},${weighingData.weightOfAxle4},${weighingData.weightOfAxle5},${weighingData.weightOfAxle6},${weighingData.weightOfAxle7},${weighingData.weightOfAxle8},${weighingData.weightOfAxle9},${weighingData.weightOfAxle10}, '${RFID}', 2)`, { type: QueryTypes.INSERT })
                }
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
        const record = (await axios.get(`http://192.168.238.72/gcs/api/gcsstation/GetMissingVehicleRecord${q}`, { headers: { ApiKey: req.query.ApiKey } })).data
        const {stationID, timeStamp, laneID, direction, frontLicensePlate, rearLicensePlate, weighingData, RFID} = record
        const imageRef = await getImageRef(timeStamp, stationID, direction)
        await saveImage(record, imageRef)
        if (direction === 'IN') {
            const rows = await sequelize.query(`update VehicleIn
            set F1A = '${frontLicensePlate.plateNumber}', F1APID = ${frontLicensePlate.provinceID}, R1A = '${rearLicensePlate.plateNumber}', R1APID = ${rearLicensePlate.provinceID}, ImageRef = '${imageRef}', RFID = '${RFID}', CreateBy = 2
            where StationID = ${stationID} and TimeStampIn = '${dateTimeSQLFormatter(timeStamp)}' and LaneID = ${laneID}`, { type: QueryTypes.UPDATE })
            if (rows[1] === 0) {
                await sequelize.query(`insert into VehicleIn(StationID, TimeStampIn, LaneID, F1A, F1APID, R1A, R1APID, ImageRef, RFID, CreateBy)
                values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}', '${RFID}', 2)`, { type: QueryTypes.INSERT })
            }
        } else if (req.body.direction === 'OUT') {
            const rows = await sequelize.query(`update VehicleOut
            set F2A = '${frontLicensePlate.plateNumber}', F2APID = ${frontLicensePlate.provinceID}, R2A = '${rearLicensePlate.plateNumber}', R2APID = ${rearLicensePlate.provinceID}, ImageRef = '${imageRef}', GrossWt = ${weighingData.totalWeight}, NumAxles = ${weighingData.numberOfAxles}, Axle01 = ${weighingData.weightOfAxle1}, Axle02 = ${weighingData.weightOfAxle2}, Axle03 = ${weighingData.weightOfAxle3}, Axle04 = ${weighingData.weightOfAxle4}, Axle05 = ${weighingData.weightOfAxle5}, Axle06 = ${weighingData.weightOfAxle6}, Axle07 = ${weighingData.weightOfAxle7}, Axle08 = ${weighingData.weightOfAxle8}, Axle09 = ${weighingData.weightOfAxle9}, Axle10 = ${weighingData.weightOfAxle10}, RFID = '${RFID}', CreateBy = 2
            where StationID = ${stationID} and TimeStampOut = '${dateTimeSQLFormatter(timeStamp)}' and LaneID = ${laneID}`, { type: QueryTypes.UPDATE })
            if (rows[1] === 0) {
                await sequelize.query(`insert into VehicleOut(StationID, TimeStampOut, LaneID, F2A, F2APID, R2A, R2APID, ImageRef, GrossWt, NumAxles, Axle01, Axle02, Axle03, Axle04, Axle05, Axle06, Axle07, Axle08, Axle09, Axle10, RFID, CreateBy)
                values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}',${weighingData.totalWeight},${weighingData.numberOfAxles},${weighingData.weightOfAxle1},${weighingData.weightOfAxle2},${weighingData.weightOfAxle3},${weighingData.weightOfAxle4},${weighingData.weightOfAxle5},${weighingData.weightOfAxle6},${weighingData.weightOfAxle7},${weighingData.weightOfAxle8},${weighingData.weightOfAxle9},${weighingData.weightOfAxle10}, '${RFID}', 2)`, { type: QueryTypes.INSERT })
            }
        }
        res.status(200).send('OK')
    } catch (error) {
        next(error)
    }
}

exports.opengate = async (req, res, next) => {
    try {
        let q = `?stationID=${req.query.stationID}&laneID=${req.query.laneID}`
        await axios.get(`http://192.168.238.72/gcs/api/gcsstation/opengate${q}`, {
            headers: { ApiKey: req.query.ApiKey }
        })
        res.status(200).send('OK')
    } catch (error) {
        next(error)
    }
}

exports.getServerTime = async (req, res, next) => {
    try {
        const serverTime = (await axios.get('http://192.168.238.72/gcs/api/gcsstation/getservertime', {
            headers: { ApiKey: req.query.ApiKey }
        })).data
        res.status(200).send(serverTime)
    } catch (error) {
        next(error)
    }
}