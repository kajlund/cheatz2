const MunicipalityRepository = require('./municipality.repository')

exports.getMunicipalityByCode = async (code) => {
  return await MunicipalityRepository.findUnique({ code })
}

exports.isMunicipalityRegistered = async (code) => {
  const mncp = await exports.getMunicipalityByCode(code)
  return !!mncp
}
