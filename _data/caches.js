/* eslint-disable no-console */
const caches = require('./caches.json')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const addCaches = async () => {
  // Delete all
  await prisma.cacheComment.deleteMany({})
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

addCaches()
