const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')

module.exports = async (req, res, next) => {
    try {
        const { VehicleInID, VehicleOutID, TransportID, StationID, LaneID } = req.body

        let ext = ``
        if (!!TransportID) {
            ext = `update Transport
            set VehicleInID = ${VehicleInID}, VehicleOutID = ${VehicleOutID}
            where TransportID = ${TransportID}`
        }
        
        const update_query = `update VehicleIn
        set VehicleOutID = ${VehicleOutID}, MatchBy = 1
        where VehicleInID = ${VehicleInID}
        
        update VehicleOut
        set VehicleInID = ${VehicleInID}, TransportID = ${TransportID || 'NULL'}
        where VehicleOutID = ${VehicleOutID}
        
        ${ext}`
        
        await sequelize.query(update_query, { type: QueryTypes.UPDATE })
        res.status(200).send({
            result: 'OK'
        })
    } catch (error) {
        res.status(500).send({
            result: error.message
        })
    }
}