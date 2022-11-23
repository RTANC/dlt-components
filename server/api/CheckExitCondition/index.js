module.exports = async (req, res, next) => {
    try {
        res.status(200).send({
            stationID: 1,
            laneID: 1,
            seqID: 20220600045,
            result: 'OK'
        })
    } catch (error) {
        next(error)
    }
}