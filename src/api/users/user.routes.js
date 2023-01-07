const { auth, adminOnly } = require('../../middleware/auth')
const UserController = require('./user.controller')

module.exports = {
  group: {
    prefix: '/users',
    middleware: [auth, adminOnly], // Direct manipulation of user data for admins only
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: UserController.listUsers,
    },
    {
      method: 'get',
      path: '/:id',
      middleware: [],
      handler: UserController.getUserById,
    },
    {
      method: 'post',
      path: '/',
      middleware: [],
      handler: UserController.addUser,
    },
    {
      method: 'put',
      path: '/:id',
      middleware: [],
      handler: UserController.updateUser,
    },
    {
      method: 'delete',
      path: '/:id',
      middleware: [],
      handler: UserController.deleteUser,
    },
  ],
}
