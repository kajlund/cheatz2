const { hashPassword } = require('../auth/auth.service')
const prisma = require('../../db')

exports.addUser = async (data) => {
  data.password = await hashPassword(data.password)
  const user = await prisma.user.create({ data })
  return user
}

exports.getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

exports.getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id } })
}

exports.isUserRegistered = async (email) => {
  const user = await exports.getUserByEmail(email)
  return !!user
}
