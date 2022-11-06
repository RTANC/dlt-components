const client = require("@jsreport/nodejs-client")("http://localhost:5492", "admin", "123456789")
exports.gcs01 = async (req, res, next) => {
    try {
        const response = await client.render({ template: { shortid: 'H7UaSVeTxQ' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS1.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}