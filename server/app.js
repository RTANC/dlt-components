const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment-timezone')
const cors = require('cors')
const app = express()
const api = require('./api')
const morgan = require('morgan')
const rfs = require('rotating-file-stream')
const path = require('path')
const timeout = require('connect-timeout')

moment.tz.setDefault('Asia/Bangkok')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(cors())
app.use(timeout(30000))

morgan.token('id', function getId (req) {
    return typeof req.userData !== 'undefined' ? req.userData._id : '-'
})

const accessLogStream = rfs.createStream(() => { return moment().format('DD-MM-YYYY') + '.log' }, {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'logs')
})
app.use(morgan(':id :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', {
    stream: accessLogStream,
    skip: function (req, res) { return res.statusCode < 400 } // EXAMPLE: only log error responses
}))

app.use('/public', express.static('D:/public'))
app.use('/api', api)

app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message
    })
})
module.exports = app