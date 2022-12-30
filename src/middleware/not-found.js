const { NotFoundError } = require('../modules/errors')

const notFound = (req, res, next) => {
  throw new NotFoundError()
}

module.exports = notFound
