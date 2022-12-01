const moment = require('moment')
const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')
const { saveImage, getImageRef, dateTimeSQLFormatter } = require("../../utils/utils")


module.exports = async (req, res, next) => {
    try {
        const {stationID, timeStamp, laneID, frontLicensePlate, rearLicensePlate, weighingData, RFID} = req.body
        const imageRef = await getImageRef(req.body.timeStamp, req.body.stationID, req.body.direction)
        saveImage(req.body, imageRef)
        if (req.body.direction === 'in') {
            await sequelize.query(`insert into VehicleIn(StationID, TimeStampIn, LaneID, F1A, F1APID, R1A, R1APID, ImageRef, RFID)
            values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}', '${RFID}')`, { type: QueryTypes.INSERT })
        } else if (req.body.direction === 'out') {
            await sequelize.query(`insert into VehicleOut(StationID, TimeStampOut, LaneID, F2A, F2APID, R2A, R2APID, ImageRef, GrossWt, NumAxles, Axle01, Axle02, Axle03, Axle04, Axle05, Axle06, Axle07, Axle08, Axle09, Axle10, RFID)
            values(${stationID},'${dateTimeSQLFormatter(timeStamp)}',${laneID},'${frontLicensePlate.plateNumber}',${frontLicensePlate.provinceID},'${rearLicensePlate.plateNumber}',${rearLicensePlate.provinceID},'${imageRef}',${weighingData.totalWeight},${weighingData.numberOfAxles},${weighingData.weightOfAxle1},${weighingData.weightOfAxle2},${weighingData.weightOfAxle3},${weighingData.weightOfAxle4},${weighingData.weightOfAxle5},${weighingData.weightOfAxle6},${weighingData.weightOfAxle7},${weighingData.weightOfAxle8},${weighingData.weightOfAxle9},${weighingData.weightOfAxle10}, '${RFID}')`, { type: QueryTypes.INSERT })
        }
        res.status(200).send({
            stationID: req.body.stationID,
            laneID: req.body.laneID,
            seqID: req.body.seqID,
            result: 'OK'
        })
    } catch (error) {
        res.status(500).send({
            stationID: req.body.stationID,
            laneID: req.body.laneID,
            seqID: req.body.seqID,
            result: error.message
        })
    }
}