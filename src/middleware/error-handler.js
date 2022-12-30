const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const cnf = require('../config')
const logger = require('../modules/logger')
const { AppError } = require('../modules/errors')

/**
 * Generic Error Handling middleware. Will be called from controllers using next(e)
 * or by throwing errors
 */
module.exports = (err, req, res, next) => {
  err.statusCode = err.status || err.statusCode || 500

  if (cnf.nodeEnv !== 'development' && !(err instanceof AppError)) {
    if (err.statusCode <= StatusCodes.BAD_REQUEST) {
      err.message = ReasonPhrases.BAD_REQUEST
    } else if (err.statusCode >= StatusCodes.INTERNAL_SERVER_ERROR) {
      logger.error('Generic exception handler caught error: %O', err)
      err.message = ReasonPhrases.INTERNAL_SERVER_ERROR
    }
  }

  return res.status(err.statusCode).send({
    success: false,
    message: err.message,
    status: err.statusCode,
  })
}
