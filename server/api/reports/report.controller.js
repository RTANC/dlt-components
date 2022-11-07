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

exports.gcs02 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5488', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'lldYmhM5F3' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS02.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs03 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5488', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'pGINYt4mWL' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS03.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs04 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5488', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'H-Uyo4wBRX' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS04.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs05 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5488', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'YC7Hv2kifI' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS05.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs06 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5489', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'nIqn2H_1Dm' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS06.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs07 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5489', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'ibfh9dkO9b' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS07.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs08 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5489', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'd5bHOOHrT' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS08.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs09 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5489', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: '_IM4JK2Xm' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS09.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs10 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5490', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'VWfwYFJGWl' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS10.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs11 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5490', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'lmeMkheHI' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS11.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs12 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5490', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'fkq4q6ZFQE' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS12.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs13 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5490', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'cgwMColChR' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS13.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs14 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5491', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'GNVVZrUvf3' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS14.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs15 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5491', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'D3B-iDkJvW' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS15.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs16 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5491', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'pqtaRfZufC' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS16.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs17 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5491', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'f28KLyV9S1' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS17.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}

exports.gcs18 = async (req, res, next) => {
    try {
        const client = require("@jsreport/nodejs-client")(process.env.JSREPORT_URL + ':5492', process.env.JSREPORT_USERNAME, process.env.JSREPORT_PASSWORD)
        const response = await client.render({ template: { shortid: 'JF7MKzyJlb' } })
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=GCS18.pdf')
        response.pipe(res)
    } catch (error) {
        next(error)
    }
}