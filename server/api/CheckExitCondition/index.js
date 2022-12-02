module.exports = async (req, res, next) => {
    const { stationID, laneID, seqID, RFID, frontLicensePlate, rearLicensePlate } = req.body
    try {
        res.status(200).send({
            stationID: stationID,
            laneID: laneID,
            seqID: seqID,
            result: 'OK'
        })
    } catch (error) {
        res.status(500).send({
            stationID: stationID,
            laneID: laneID,
            seqID: seqID,
            result: error.message
        })
    }
}