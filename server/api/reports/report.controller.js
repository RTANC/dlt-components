exports.gcs01 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5492', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'H7UaSVeTxQ' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS01.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}