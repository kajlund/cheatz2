const crypto = require('crypto')

const { compare, hash } = require('bcrypt')
const jwt = require('jsonwebtoken')

const cnf = require('../../config')
const prisma = require('../../db')

exports.generateTokens = async (user) => {
  const payload = { id: user.id, email: user.email, username: user.username }
  const accessToken = await generateAccessToken(payload)
  const refreshToken = await generateRefreshToken()
  await prisma.token.create({ data: { userId: user.id, token: refreshToken } })

  return {
    accessToken,
    refreshToken,
  }
}

const generateAccessToken = async (payload) => {
  return await jwt.sign(payload, cnf.jwtAccessTokenSecret, { expiresIn: cnf.jwtAccessTokenExpiresIn })
}

const generateRefreshToken = async (length = 64) => {
  return await crypto.randomBytes(length).toString('hex')
}

exports.hashPassword = async (pwd) => {
  return await hash(pwd, cnf.saltRounds)
}

exports.passwordsMatch = async (user, passwordCandidate) => {
  return await compare(passwordCandidate, user.password)
}
