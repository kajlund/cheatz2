// const { auth, adminOnly } = require('../../middleware/auth')
const PagesController = require('./pages.controller')

module.exports = {
  group: {
    prefix: '',
    middleware: [],
  },
  routes: [
    {
      method: 'get',
      path: '/',
      middleware: [],
      handler: PagesController.showHomePage,
    },
    {
      method: 'get',
      path: '/logon',
      middleware: [],
      handler: PagesController.showLogon,
    },
    {
      method: 'get',
      path: '/about',
      middleware: [],
      handler: PagesController.showAboutPage,
    },
  ],
}
