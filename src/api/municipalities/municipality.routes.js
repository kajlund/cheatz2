const MunicipalityController = require('./municipality.controller')
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
      handler: MunicipalityController.findAll,
    },
    {
      method: 'get',
      path: '/byname/:name',
      middleware: [],
      handler: MunicipalityController.getByNamePart,
    },
    {
      method: 'get',
      path: '/:id',
      middleware: [],
      handler: MunicipalityController.getById,
    },
    {
      method: 'post',
      path: '/',
      middleware: [adminOnly],
      handler: MunicipalityController.addMunicipality,
    },
    {
      method: 'put',
      path: '/:id',
      middleware: [adminOnly],
      handler: MunicipalityController.updateMunicipality,
    },
    {
      method: 'delete',
      path: '/:id',
      middleware: [adminOnly],
      handler: MunicipalityController.deleteById,
    },
  ],
}
