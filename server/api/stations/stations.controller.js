exports.getStations = async (req, res, next) => {
    try {
        stations = ['พุทธมณฑล', 'คลองหลวง', 'ร่มเกล้า']
        res.status(200).send(stations)
    } catch (error) {
        next(error)
    }
}