const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const { engine } = require('express-handlebars')

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
    this.app.use(express.static('public'))
  }

  _setupRoutes() {
    this.app.get('/ping', (req, res) => res.send('pong'))
    this.router.create(this.app)
  }

  _setViewEngine() {
    logger.info('Setting up the handlebars view engine for (.hbs) files')
    this.app.engine(
      'hbs',
      engine({
        extname: '.hbs',
      })
    )

    this.app.set('view engine', 'hbs')
    this.app.set('views', './views')
  }

  _startScheduler() {}
}

module.exports = Server
