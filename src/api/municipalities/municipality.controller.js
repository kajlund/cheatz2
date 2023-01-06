const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const MunicipalityRepository = require('./municipality.repository')

const { NotFoundError } = require('../../modules/errors')
const { validateMunicipality, validateMunicipalityUpdate } = require('./municipality.validators')

class MunicipalityController {
  async addMunicipality(req, res) {
    const validation = await validateMunicipality(req.body)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: validation.errors,
      })
    }

    const data = await MunicipalityRepository.create(validation.data)
    // Return result
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Added municipality',
      data,
    })
  }

  async deleteById(req, res) {
    const { id } = req.params
    const data = await MunicipalityRepository.destroy(id)
    if (!data) throw new NotFoundError()
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Deleted municipality id: ${id}`,
      data,
    })
  }

  async findAll(req, res) {
    const data = await MunicipalityRepository.findMany()
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'List all municipalities',
      data,
    })
  }

  async getById(req, res) {
    const { id } = req.params
    const data = await MunicipalityRepository.findUnique({ id })
    if (!data) throw new NotFoundError()
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Found municipality by id: ${id}`,
      data,
    })
  }

  async getByNamePart(req, res) {
    const { name } = req.params
    const data = await MunicipalityRepository.findMany({
      name: { contains: name },
    })
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Find by name: ${name}`,
      data,
    })
  }

  async updateMunicipality(req, res) {
    const { id } = req.params
    const validation = await validateMunicipalityUpdate(req)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: validation.errors,
      })
    }
    const data = await MunicipalityRepository.update(id, validation.data)
    // Return result
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Updated municipality with id: ${id}`,
      data,
    })
  }
}

module.exports = new MunicipalityController()
