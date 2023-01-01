const jwt = require('jsonwebtoken')

const cnf = require('../config')
const { UnauthorizedError } = require('../modules/errors')
const { getUserById } = require('../api/users/user.service')

exports.auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) next(new UnauthorizedError('Missing bearer token'))

  try {
    const decoded = await jwt.verify(token, cnf.jwtAccessTokenSecret)
    req.user = await getUserById(decoded.id)
    next()
  } catch (err) {
    next(new UnauthorizedError(err.message))
  }
}

exports.adminOnly = (req, res, next) => {
  if (req.user.role === 'ADMIN') {
    next()
  } else {
    next(new UnauthorizedError('Admin only'))
  }
}
