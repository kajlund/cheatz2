const cors = require('cors')
const express = require('express')
const morgan = require('morgan')

const logger = require('./modules/logger')
const Router = require('./router')

class Server {
  constructor(port) {
    this.port = port
    this.app = express()
    this.setupMiddleware()
    this.router = Router
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
    this.app.use(morgan('dev'))
  }

  _setupRoutes() {
    this.app.get('/ping', (req, res) => res.send('pong'))
    this.router.create(this.app)
  }

  _setViewEngine() {}

  _startScheduler() {}
}

module.exports = Server
