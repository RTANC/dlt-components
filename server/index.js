const http = require('http')
const app = require('./app')

const server = http.createServer(app)

function listen() {
    server.listen(process.env.PORT, '0.0.0.0', () => {
        console.log('Server is running at port ' + process.env.PORT)
    })
}

function connect() {
    // mongoose.connection
    //   .on('error', console.log)
    //   .on('disconnected', connect)
    //   .once('open', listen)
    // return mongoose.connect(process.env.MONGO_URL_STRING, {
    //   keepAlive: true,
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // })
}

connect()
