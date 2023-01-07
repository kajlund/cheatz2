const BaseRepository = require('../../modules/base.repository')

class MunicipalityRepository extends BaseRepository {
  async getCachesByCode(code) {
    return await this.model.findUnique({ where: { code: Number(code) }, include: { caches: true } })
  }
}

module.exports = new MunicipalityRepository('municipality')
