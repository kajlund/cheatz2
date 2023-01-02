const prisma = require('../db')

class BaseRepository {
  constructor(model) {
    this.model = prisma[model]
  }

  async findFirst(filter = {}) {
    this.model.findFirst({ where: filter })
  }

  async findMany(filter = {}) {
    return await this.model.findMany({ where: filter })
  }

  async findUnique(filter = {}) {
    return await this.model.findUnique({ where: filter })
  }

  async create(data) {
    return await this.model.create({
      data,
    })
  }

  async destroy(id) {
    try {
      const deleted = await this.model.delete({
        where: { id },
      })
      return deleted
    } catch (e) {
      return null // record was not found
    }
  }

  async update(id, data = {}) {
    try {
      const updated = await this.model.update({
        where: { id },
        data,
      })
      return updated
    } catch (e) {
      return null // record was not found
    }
  }
}

module.exports = BaseRepository
