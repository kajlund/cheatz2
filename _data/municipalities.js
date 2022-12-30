const municipalities = require('./municipalities.json')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const addMunicipalities = async () => {
  for (const key in municipalities) {
    let nameSv = municipalities[key].KUNTANIMISV
    let name = municipalities[key].KUNTANIMIFI
    if (nameSv !== name) {
      name += `/${nameSv}`
    }
    await prisma.municipality.create({
      data: {
        code: parseInt(key, 10),
        name,
      },
    })
  }
}

addMunicipalities()
