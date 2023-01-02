const MunicipalityRepository = require('./municipality.repository')

exports.addMunicipality = async (data) => {
  return await MunicipalityRepository.create(data)
}

exports.deleteMunicipalityById = async (id) => {
  return await MunicipalityRepository.destroy(id)
}

exports.getAllMunicipalities = async () => {
  return await MunicipalityRepository.findMany()
}

exports.getMunicipalitiesByName = async (name) => {
  return await MunicipalityRepository.findMany({
    name: { contains: name },
  })
}

exports.getMunicipalityById = async (id) => {
  return await MunicipalityRepository.findUnique({ id })
}

exports.getMunicipalityByCode = async (code) => {
  return await MunicipalityRepository.findUnique({ code })
}

exports.isMunicipalityRegistered = async (code) => {
  const mncp = await exports.getMunicipalityByCode(code)
  return !!mncp
}

exports.updateMunicipality = async (id, data) => {
  return await MunicipalityRepository.update(id, data)
}
