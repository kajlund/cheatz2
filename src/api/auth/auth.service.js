const crypto = require('crypto')

const { compare, hash } = require('bcrypt')
const jwt = require('jsonwebtoken')

const cnf = require('../../config')
const TokenRepository = require('./token.repository')

exports.generateTokens = async (user) => {
  const payload = { id: user.id, email: user.email, username: user.username }
  const accessToken = generateAccessToken(payload)
  const refreshToken = generateRefreshToken()
  await TokenRepository.create({ userId: user.id, token: refreshToken })

  return {
    accessToken,
    refreshToken,
  }
}

const generateAccessToken = (payload) => {
  return jwt.sign(payload, cnf.jwtAccessTokenSecret, { expiresIn: cnf.jwtAccessTokenExpiresIn })
}

const generateRefreshToken = (length = 64) => {
  return crypto.randomBytes(length).toString('hex')
}

exports.hashPassword = async (pwd) => {
  return await hash(pwd, cnf.saltRounds)
}

exports.passwordsMatch = async (user, passwordCandidate) => {
  return await compare(passwordCandidate, user.password)
}
