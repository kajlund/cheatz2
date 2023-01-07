const { isEmail, isEmpty, isLength, trim } = require('validator')
const UserRepository = require('./user.repository')

const validRoles = ['PROSPECT', 'USER', 'ADMIN']

exports.validateNewUser = async (userData = {}) => {
  const errors = {}
  const data = {
    username: userData.username ? trim(userData.username) : '',
    email: userData.email ? trim(userData.email) : '',
    password: userData.password ? trim(userData.password) : '',
  }

  if (isEmpty(data.username)) {
    errors.username = 'A user must have a username'
  }

  if (!isEmail(data.email)) {
    errors.email = 'A user must have a valid email address'
  }

  const registeredUser = await UserRepository.findUnique({ email: data.email })
  if (registeredUser) {
    errors.isRegistered = `Email ${data.email} is already registered`
  }

  if (!isLength(data.password, { min: 8, max: 50 })) {
    errors.password = 'Password must be between 8 and 50 characters long'
  }

  const password_confirm = userData.password_confirm ? trim(userData.password_confirm) : ''
  if (password_confirm !== data.password) {
    errors.password_confirm = 'Passwords do not match'
  }

  const isValid = Object.keys(errors).length === 0
  return { isValid, errors, data }
}

exports.validateUserUpdate = async (userData = {}) => {
  const errors = {}
  const data = {}

  if (userData.username) data.username = trim(userData.username)
  if (!validRoles.includes(userData.role)) {
    errors.role = `A role must be one of: ${validRoles.join(',')}`
  } else {
    data.role = userData.role
  }

  const isValid = Object.keys(errors).length === 0
  return { isValid, errors, data }
}
