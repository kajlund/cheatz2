const { isEmpty, trim, isUUID } = require('validator')

const { isMunicipalityRegistered } = require('./municipality.service')

exports.validateId = (id) => {
  return isUUID(id)
}

exports.validateMunicipalityUpdate = async (req) => {
  const errors = {}
  if (!isUUID(req.params.id)) {
    errors.id = 'You need to provide a valid id parameter (uuid)'
  }
  const data = {
    name: req.body.name ? trim(req.body.name) : '',
  }

  if (isEmpty(data.name)) {
    errors.username = 'A municipality name cannot be empty'
  }

  const isValid = Object.keys(errors).length === 0
  return { isValid, errors, data }
}

exports.validateMunicipality = async (userData = {}) => {
  const errors = {}
  const data = {
    code: userData.code ? userData.code : NaN,
    name: userData.name ? trim(userData.name) : '',
  }

  if (isNaN(data.code)) {
    errors.code = `Municipality code ${data.code} must be a number`
  }

  if (isEmpty(data.name)) {
    errors.username = 'A municipality name cannot be empty'
  }

  const isRegistered = await isMunicipalityRegistered(data.code)
  if (isRegistered) {
    errors.isRegistered = `Municipality ${data.code} is already registered`
  }

  const isValid = Object.keys(errors).length === 0
  return { isValid, errors, data }
}
