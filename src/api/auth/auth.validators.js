const { isEmail, isEmpty, trim } = require('validator')

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
