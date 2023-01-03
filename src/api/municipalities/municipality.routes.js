const mncpHandlers = require('./municipality.handlers')
const { auth, adminOnly } = require('../../middleware/auth')

module.exports = {
  group: {
    prefix: '/municipalities',
    middleware: [auth],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: mncpHandlers.getAll,
    },
    {
      method: 'get',
      path: '/byname/:name',
      middleware: [],
      handler: mncpHandlers.getByNamePart,
    },
    {
      method: 'get',
      path: '/:id',
      middleware: [],
      handler: mncpHandlers.getById,
    },
    {
      method: 'post',
      path: '/',
      middleware: [adminOnly],
      handler: mncpHandlers.addMunicipality,
    },
    {
      method: 'put',
      path: '/:id',
      middleware: [adminOnly],
      handler: mncpHandlers.updateMunicipality,
    },
    {
      method: 'delete',
      path: '/:id',
      middleware: [adminOnly],
      handler: mncpHandlers.deleteById,
    },
  ],
}
