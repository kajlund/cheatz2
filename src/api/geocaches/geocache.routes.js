const GeocacheController = require('./geocache.controller')
const { auth, adminOnly } = require('../../middleware/auth')

module.exports = {
  group: {
    prefix: '/geocaches',
    middleware: [auth],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: GeocacheController.listCaches,
    },
    {
      method: 'get',
      path: '/user',
      middleware: [],
      handler: GeocacheController.listUserCaches,
    },
    {
      method: 'get',
      path: '/municipality/:code',
      middleware: [],
      handler: GeocacheController.listMunicipalityCaches,
    },
    {
      method: 'get',
      path: '/:id',
      middleware: [],
      handler: GeocacheController.getCacheById,
    },
    {
      method: 'get',
      path: '/bycode/:gc',
      middleware: [],
      handler: GeocacheController.getCacheByCode,
    },
    {
      method: 'post',
      path: '/',
      middleware: [],
      handler: GeocacheController.addCache,
    },
    {
      method: 'put',
      path: '/:id',
      middleware: [],
      handler: GeocacheController.updateCache,
    },
    {
      method: 'delete',
      path: '/:id',
      middleware: [adminOnly],
      handler: GeocacheController.deleteCache,
    },
  ],
}
