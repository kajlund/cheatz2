const prisma = require('../../db')

exports.addMunicipality = async (data) => {
  return await prisma.municipality.create({
    data,
  })
}

exports.deleteMunicipalityById = async (id) => {
  const deleted = await prisma.municipality.delete({
    where: { id },
  })
  return deleted
}

exports.getAllMunicipalities = async () => {
  return await prisma.municipality.findMany()
}

exports.getMunicipalitiesByName = async (name) => {
  return await prisma.municipality.findMany({
    where: {
      name: { contains: name },
    },
  })
}

exports.getMunicipalityById = async (id) => {
  return await prisma.municipality.findUnique({
    where: { id },
  })
}

exports.getMunicipalityByCode = async (code) => {
  return await prisma.municipality.findUnique({ where: { code } })
}

exports.isMunicipalityRegistered = async (code) => {
  const mncp = await exports.getMunicipalityByCode(code)
  return !!mncp
}

exports.updateMunicipality = async (id, data) => {
  return await prisma.municipality.update({
    where: { id },
    data,
  })
}
