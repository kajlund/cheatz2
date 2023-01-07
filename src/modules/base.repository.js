const prisma = require('../db')

class BaseRepository {
  constructor(model) {
    this.model = prisma[model]
  }

  async findFirst(filter = {}) {
    this.model.findFirst({ where: filter })
  }

  async findMany(filter = {}, select = null, include = null) {
    const selectQuery = { where: filter }
    if (include) {
      selectQuery.include = include
    }

    if (select) {
      selectQuery.select = select
    }

    return await this.model.findMany(selectQuery)
  }

  async findUnique(filter = {}, select = null, include = null) {
    const selectQuery = { where: filter }
    if (include) {
      selectQuery.include = include
    }

    if (select) {
      selectQuery.select = select
    }

    return await this.model.findUnique(selectQuery)
  }

  async create(data, select = null, include = null) {
    const createData = { data }
    if (include) {
      createData.include = include
    }

    if (select) {
      createData.select = select
    }
    return await this.model.create(createData)
  }

  async destroy(id, select = null, include = null) {
    const deleteData = { where: { id } }
    if (include) {
      deleteData.include = include
    }

    if (select) {
      deleteData.select = select
    }

    try {
      const deleted = await this.model.delete(deleteData)
      return deleted
    } catch (e) {
      return null // record was not found
    }
  }

  async update(id, data = {}, select = null, include = null) {
    const updateData = { where: { id }, data }
    if (include) {
      updateData.include = include
    }

    if (select) {
      updateData.select = select
    }

    try {
      const updated = await this.model.update(updateData)

      return updated
    } catch (e) {
      return null // record was not found
    }
  }
}

module.exports = BaseRepository
