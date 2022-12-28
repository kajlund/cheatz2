const { StatusCodes, ReasonPhrases } = require('http-status-codes')

class AppError extends Error {
  constructor(message = ReasonPhrases.INTERNAL_SERVER_ERROR, status = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message)
    this.status = status
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

class InternalServerError extends AppError {
  constructor(message = ReasonPhrases.INTERNAL_SERVER_ERROR, status = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message, status)
  }
}

class MaximumFileSizeException extends AppError {
  constructor(size = 100, status = StatusCodes.BAD_REQUEST) {
    super(`Maximum upload file size (${size}) exceeded`, status)
  }
}

class NotFoundError extends AppError {
  constructor(message = ReasonPhrases.NOT_FOUND, status = StatusCodes.NOT_FOUND) {
    super(message, status)
  }
}

class UnauthorizedError extends AppError {
  constructor(message = ReasonPhrases.UNAUTHORIZED, status = StatusCodes.UNAUTHORIZED) {
    super(message, status)
  }
}

module.exports = { AppError, InternalServerError, MaximumFileSizeException, NotFoundError, UnauthorizedError }
