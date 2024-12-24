const jwt = require('jsonwebtoken')
const { isNULL } = require('../../utils/utils.js')

exports.webAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decode
        next()
    } catch (e) {
        res.status(401).send(e.message)
    }
}

exports.apiAuth = (req, res, next) => {
    try {
        const authId = req.headers.authid
        if (authId === process.env.AUTH_ID) {
            next()
        } else {
            throw Error()
        }
    } catch (error) {
        res.sendStatus(401)
    }
}

exports.apiKeyAuth = (req, res, next) => {
    let apiKey = req.headers.apiKey
    try {
        if (isNULL(apiKey)) {
            throw Error('Unauthorized')
        } else if (apiKey !== process.env.ApiKey) {
            throw Error('Access denied')
        } else if (apiKey === process.env.ApiKey) {
            next()
        }
    } catch (error) {
        let err
        if (isNULL(apiKey)) {
            err = {
                ResultCode : '40100',
                ResultMsg : 'Unauthorized'
            }
        } else if (apiKey !== process.env.ApiKey) {
            err = {
                ResultCode : '40101',
                ResultMsg : 'Access denied'
            }
        }
        res.status(401).send(err)
    }
}