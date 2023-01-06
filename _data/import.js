const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcrypt')

const cnf = require('../src/config')
const caches = require('./caches.json')
const municipalities = require('./municipalities.json')
const users = require('./users.json')

const prisma = new PrismaClient()

const addUsers = async () => {
  // delete all
  await prisma.user.deleteMany({})

  users.forEach(async (user) => {
    user.password = await hash(user.password, cnf.saltRounds)
    await prisma.user.create({
      data: user,
    })
  })
}

const addMunicipalities = async () => {
  // delete all
  await prisma.municipality.deleteMany({})

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

const addCaches = async () => {
  // Delete all
  // should cascade -> await prisma.cacheComment.deleteMany({})
  await prisma.geocache.deleteMany({})
  const user = await prisma.user.findFirst({ where: { email: 'kaj.lund@gmail.com' } })

  // Loop json data and create
  for (const key in caches) {
    let mncp = await prisma.municipality.findFirst({ where: { name: { contains: caches[key].municipality } } })
    if (!mncp) {
      console.log(`No municipality found for value: ${caches[key].municipality} ${caches[key].cacheId}`)
      throw new Error('Faulty municipality')
    }
    let gc = await prisma.geocache.findUnique({ where: { gc: caches[key].cacheId } })
    if (gc) {
      console.log(
        `gc: ${caches[key].cacheId} kind: ${caches[key].cacheType.toUpperCase()} name; ${caches[key].name} coords:
        ${caches[key].coords} verified: ${caches[key].verifiedCoords} municipalityId: ${mncp.id} comment:
        ${caches[key].notes}`
      )
    } else {
      await prisma.geocache.create({
        data: {
          createdAt: caches[key].createdAt,
          updatedAt: caches[key].updatedAt,
          gc: caches[key].cacheId,
          kind: caches[key].cacheType.toUpperCase(),
          name: caches[key].name,
          coords: caches[key].coords,
          verified: caches[key].verifiedCoords,
          municipalityId: mncp ? mncp.id : null,
          userId: user.id,
          comments: {
            create: [
              {
                body: caches[key].notes ? caches[key].notes : '',
                userId: user.id,
              },
            ],
          },
        },
      })
    }
  }
}

const importAll = async () => {
  await addUsers()
  await addMunicipalities()
  await addCaches()
}

importAll()
