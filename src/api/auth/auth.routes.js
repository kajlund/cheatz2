const AuthController = require('./auth.controller')

module.exports = {
  group: {
    prefix: '',
    middleware: [],
  },
  routes: [
    {
      method: 'post',
      path: '/logon',
      middleware: [],
      handler: AuthController.logon,
    },
    {
      method: 'post',
      path: '/signup',
      middleware: [],
      handler: AuthController.register,
    },
  ],
}
