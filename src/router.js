const express = require('express')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const cnf = require('./config')
const { AppError } = require('./modules/errors')
const authRoutes = require('./api/auth/auth.routes')
const logger = require('./modules/logger')
const mncpRoutes = require('./api/municipalities/municipality.routes')
const cacheRoutes = require('./api/geocaches/geocache.routes')
const userRoutes = require('./api/users/user.routes')
const webRoutes = require('./pages/pages.routes')

class Router {
  constructor() {
    this.router = express.Router()
    this.apiRoutes = [authRoutes, userRoutes, mncpRoutes, cacheRoutes]
    this.webRoutes = [webRoutes]
  }

  create(app) {
    this._attachWebRoutes()
    this._attachApiRoutes()

    this._handlePageNotFound()

    this._handleExceptions()

    // register router
    app.use(this.router)
  }

  _handleExceptions() {
    this.router.use((err, req, res, next) => {
      err.statusCode = err.status || err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR

      if (cnf.nodeEnv !== 'development' && !(err instanceof AppError)) {
        if (err.statusCode <= StatusCodes.BAD_REQUEST) {
          err.message = ReasonPhrases.BAD_REQUEST
        } else if (err.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) {
          logger.error('Generic exception handler caught error: %O', err)
          err.message = ReasonPhrases.INTERNAL_SERVER_ERROR
        }
      }

      return res.status(err.statusCode).json({
        success: false,
        message: err.message,
      })
    })
  }

  _catchError(route) {
    return (req, res, next) => {
      route(req, res, next).catch(next)
    }
  }

  _handlePageNotFound() {
    this.router.all('*', (req, res) => {
      res.status(StatusCodes.NOT_FOUND).send({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
      })
    })
  }

  _attachWebRoutes() {
    this._attachRoutes(this.webRoutes, '')
  }

  _attachApiRoutes() {
    this._attachRoutes(this.apiRoutes, '/api')
  }

  _attachRoutes(routeGroups, prefix = '') {
    routeGroups.forEach(({ group, routes }) => {
      routes.forEach(({ method, path, middleware = [], handler }) => {
        logger.info(`Route: ${method} ${prefix}${group.prefix}${path}`)
        this.router[method](
          prefix + group.prefix + path,
          [...(group.middleware || []), ...middleware],
          this._catchError(handler)
        )
      })
    })
  }
}

module.exports = new Router()
