const { hashPassword } = require('../auth/auth.service')
const logger = require('../../modules/logger')
const prisma = require('../../db')

exports.addUser = async (data) => {
  data.password = await hashPassword(data.password)
  const user = await prisma.user.create({ data })
  return user
}

exports.getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } })
    return user
  } catch (err) {
    logger.error(err)
    return null
  }
}

exports.isUserRegistered = async (email) => {
  const user = await exports.getUserByEmail(email)
  return !!user
}
