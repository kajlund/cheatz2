const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const { NotFoundError } = require('../../modules/errors')
const GeocacheRepository = require('./geocache.repository')
const MunicipalityRepository = require('../municipalities/municipality.repository')
const UserRepository = require('../users/user.repository')

class GeocacheController {
  async addCache(req, res) {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({ message: ReasonPhrases.NOT_IMPLEMENTED })
  }

  async deleteCache(req, res) {
    const { id } = req.params
    const data = await GeocacheRepository.destroy(id)
    if (!data) throw new NotFoundError()
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Deleted municipality id: ${id}`,
      data,
    })
  }

  async getCacheById(req, res) {
    const { id } = req.params
    const data = await GeocacheRepository.findUnique({ id })
    if (!data) throw new NotFoundError()
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Found geocache by id: ${id}`,
      data,
    })
  }

  async getCacheByCode(req, res) {
    const { gc } = req.params
    const data = await GeocacheRepository.findUnique({ gc })
    if (!data) throw new NotFoundError()
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Found geocache by gc-code: ${gc}`,
      data,
    })
  }

  async listCaches(req, res) {
    const data = await GeocacheRepository.findMany()
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'List all geocaches',
      data,
    })
  }

  async listMunicipalityCaches(req, res) {
    const mncp = await MunicipalityRepository.getCachesByCode(req.params.code)
    const data = mncp.caches
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Geocaches for municipality ${mncp.name}`,
      data,
    })
  }

  async listUserCaches(req, res) {
    const user = await UserRepository.getUserCaches(req.user.id)
    const data = user.caches
    res.status(StatusCodes.OK).json({
      success: true,
      message: `List geocaches owned by ${req.user.username}`,
      data,
    })
  }

  async updateCache(req, res) {
    res.status(StatusCodes.NOT_IMPLEMENTED).json({ message: ReasonPhrases.NOT_IMPLEMENTED })
  }
}

module.exports = new GeocacheController()
