const http = require('http')
const app = require('./app')

const server = http.createServer(app)
const dbConnection = require('./connection')

async function connect() {
    try {
        await dbConnection.authenticate();
        console.log('Connection has been established successfully.');
        listen()
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

function listen() {
    server.listen(process.env.PORT, '0.0.0.0', () => {
        console.log('Server is running at port ' + process.env.PORT)
    })
}

connect()