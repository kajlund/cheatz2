const caches = require('./caches.json')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const addCaches = async () => {
  // Delete all
  await prisma.cacheComment.deleteMany({})
  await prisma.geocache.deleteMany({})
  // Loop json data and create
  for (const key in caches) {
    let mncp = await prisma.municipality.findFirst({ where: { name: { contains: caches[key].municipality } } })
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
        comments: {
          create: [
            {
              body: caches[key].notes ? caches[key].notes : '',
              userId: 'a3cfaf7f-38a7-47ea-b3fd-f72362fc1a7d',
            },
          ],
        },
      },
    })
  }
}

addCaches()
