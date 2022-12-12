const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')

module.exports = async (req, res, next) => {
    const { RFID, stationID} = req.body
    try {
        if (!RFID || !stationID) {
            throw Error('RFID and stationID are required')
        } else {
            const g1_query = `select G1VehicleID, (select CompanyName from Company where g1.CompanyID = Company.CompanyID) as CompanyName, (select Description from VehicleClass where g1.VehicleClassID = VehicleClass.VehicleClassID) as VehicleClass, FrontLP, (select ProvinceName from LPProvince where FrontLPPID = ProvinceID) as FrontLPProvince, RearLP, (select ProvinceName from LPProvince where RearLPPID = ProvinceID) as RearLPProvince, RFID
            from G1Vehicle as g1
            where StationID = ${stationID} and (RFID like '%${RFID}%' or FrontLP like '${RFID}%' or RearLP like '${RFID}%')`
            const g1Vehicles = await sequelize.query(g1_query, { type: QueryTypes.SELECT })

            const g2_query = `select G2VehicleID, (select CompanyName from Company where g2.CompanyID = Company.CompanyID) as CompanyName, (select Description from VehicleClass where g2.VehicleClassID = VehicleClass.VehicleClassID) as VehicleClass, FrontLP, (select ProvinceName from LPProvince where FrontLPPID = ProvinceID) as FrontLPProvince, RearLP, (select ProvinceName from LPProvince where RearLPPID = ProvinceID) as RearLPProvince, RFID
            from G2Vehicle as g2
            where StationID = ${stationID} and (RFID like '%${RFID}%' or FrontLP like '${RFID}%' or RearLP like '${RFID}%')`
            const g2Vehicles = await sequelize.query(g2_query, { type: QueryTypes.SELECT })

            res.status(200).send([...g1Vehicles, ...g2Vehicles])
        }
    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}