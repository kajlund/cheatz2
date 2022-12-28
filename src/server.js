const cors = require('cors')
const express = require('express')

const logger = require('./modules/logger')

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
  }

  _setupRoutes() {
    this.app.get('/ping', (req, res) => res.send('pong'))
  }

  _setViewEngine() {}

  _startScheduler() {}
}

module.exports = Server
