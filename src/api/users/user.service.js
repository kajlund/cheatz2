const { hashPassword } = require('../auth/auth.service')
const UserRepository = require('./user.repository')

exports.addUser = async (data) => {
  data.password = await hashPassword(data.password)
  const user = await UserRepository.create(data)
  return user
}

exports.getUserByEmail = async (email) => {
  return await UserRepository.findUnique({ email })
}

exports.getUserById = async (id) => {
  return await UserRepository.findUnique({ id })
}

exports.isUserRegistered = async (email) => {
  const user = await exports.getUserByEmail(email)
  return !!user
}
