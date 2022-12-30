const { isEmail, isEmpty, isLength, trim } = require('validator')

const { isUserRegistered } = require('../users/user.service')

exports.validateLogon = async (userData = {}) => {
  const errors = {}
  const data = {
    email: userData.email ? trim(userData.email) : '',
    password: userData.password ? trim(userData.password) : '',
  }

  if (!isEmail(data.email)) {
    errors.email = 'Must provide an email address to logon'
  }

  if (isEmpty(data.password)) {
    errors.password = 'Must provide a password to logon'
  }

  const isValid = Object.keys(errors).length === 0
  return { isValid, errors, data }
}

exports.validateSignup = async (userData = {}) => {
  const errors = {}
  const data = {
    username: userData.username ? trim(userData.username) : '',
    email: userData.email ? trim(userData.email) : '',
    password: userData.password ? trim(userData.password) : '',
  }

  if (isEmpty(data.username)) {
    errors.username = 'A user needs to have a username'
  }

  if (!isEmail(data.email)) {
    errors.email = 'A user needs to have a valid email address'
  }

  const isRegistered = await isUserRegistered(data.email)
  if (isRegistered) {
    errors.isRegistered = `Email ${data.email} is already registered`
  }

  if (!isLength(data.password, { min: 8, max: 50 })) {
    errors.password = 'Password should be between 8 and 50 characters long'
  }

  const password_confirm = userData.password_confirm ? trim(userData.password_confirm) : ''
  if (password_confirm !== data.password) {
    errors.password_confirm = 'Passwords do not match'
  }

  const isValid = Object.keys(errors).length === 0
  return { isValid, errors, data }
}
