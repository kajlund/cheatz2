const BaseRepository = require('../../modules/base.repository')

class UserRepository extends BaseRepository {
  async getUserCaches(id) {
    return await this.model.findUnique({ where: { id }, include: { caches: true } })
  }
}

module.exports = new UserRepository('user')
