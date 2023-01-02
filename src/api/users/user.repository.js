const BaseRepository = require('../../modules/base.repository')

class UserRepository extends BaseRepository {}

module.exports = new UserRepository('user')
