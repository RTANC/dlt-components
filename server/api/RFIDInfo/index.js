const { QueryTypes } = require('sequelize')
const sequelize = require('../../connection')

module.exports = async (req, res, next) => {
    const { RFID } = req.body
    try {
        const g1_query = `select G1VehicleID, (select CompanyName from Company where g1.CompanyID = Company.CompanyID) as CompanyName, (select Description from VehicleClass where g1.VehicleClassID = VehicleClass.VehicleClassID) as VehicleClass, FrontLP, (select ProvinceName from LPProvince where FrontLPPID = ProvinceID) as FrontLPProvince, RearLP, (select ProvinceName from LPProvince where RearLPPID = ProvinceID) as RearLPProvince, RFID
        from G1Vehicle as g1
        where RFID = '${RFID}'`
        const g1Vehicles = await sequelize.query(g1_query, { type: QueryTypes.SELECT })
        if (g1Vehicles.length === 0) {
            const g2_query = `select G2VehicleID, (select CompanyName from Company where g2.CompanyID = Company.CompanyID) as CompanyName, (select Description from VehicleClass where g2.VehicleClassID = VehicleClass.VehicleClassID) as VehicleClass, FrontLP, (select ProvinceName from LPProvince where FrontLPPID = ProvinceID) as FrontLPProvince, RearLP, (select ProvinceName from LPProvince where RearLPPID = ProvinceID) as RearLPProvince, RFID
            from G2Vehicle as g2
            where RFID = '${RFID}'`
            const g2Vehicles = await sequelize.query(g2_query, { type: QueryTypes.SELECT })
            if (g2Vehicles.length === 0) {
                res.status(404).send({
                    RFID: RFID,
                    message: 'Not Found'
                })
            } else if (g2Vehicles.length > 0) {
                res.send(200).send(g2Vehicles[0])
            }
        } else if (g1Vehicles.length > 0) {
            res.status(200).send(g1Vehicles[0])
        }
    } catch (error) {
        res.status(500).send({
            RFID: RFID,
            message: error.message
        })
    }
}