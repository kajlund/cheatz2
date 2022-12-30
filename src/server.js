const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const logger = require('./modules/logger')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

class Server {
  constructor(port) {
    this.port = port
    this.app = express()
    this.setupMiddleware()
  }

  _listen() {
    this.app.listen(this.port, () => {
      logger.info(`Server listening on ${this.port}`)
    })
  }

  start() {
    this._setViewEngine()
    this._setupRoutes()
    this._listen()
  }

  setupMiddleware() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(morgan('simple'))
  }

  _setupRoutes() {
    this.app.get('/ping', (req, res) => res.send('pong'))

    this.app.use(notFoundMiddleware)
    this.app.use(errorMiddleware)
  }

  _setViewEngine() {}

  _startScheduler() {}
}

module.exports = Server
