const jwt = require('jsonwebtoken')

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