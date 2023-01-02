const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const {
  addMunicipality,
  deleteMunicipalityById,
  getAllMunicipalities,
  getMunicipalityById,
  getMunicipalitiesByName,
  updateMunicipality,
} = require('./municipality.service')
const { NotFoundError } = require('../../modules/errors')
const { validateMunicipality, validateMunicipalityUpdate } = require('./municipality.validators')

exports.deleteById = async (req, res, next) => {
  const { id } = req.params
  try {
    const data = await deleteMunicipalityById(id)
    if (!data) throw new NotFoundError()
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Deleted municipality id: ${id}`,
      data,
    })
  } catch (e) {
    next(e)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const data = await getAllMunicipalities()
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'List all municipalities',
      data,
    })
  } catch (e) {
    next(e)
  }
}

exports.getById = async (req, res, next) => {
  const { id } = req.params
  try {
    const data = await getMunicipalityById(id)
    if (!data) throw new NotFoundError()
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Found municipality by id: ${id}`,
      data,
    })
  } catch (e) {
    next(e)
  }
}

exports.getByNamePart = async (req, res, next) => {
  const { name } = req.params
  try {
    const data = await getMunicipalitiesByName(name)
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Find by name: ${name}`,
      data,
    })
  } catch (e) {
    next(e)
  }
}

exports.addMunicipality = async (req, res, next) => {
  try {
    const validation = await validateMunicipality(req.body)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: validation.errors,
      })
    }

    const data = await addMunicipality(validation.data)
    // Return result
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Added municipality',
      data,
    })
  } catch (e) {
    next(e)
  }
}

exports.updateMunicipality = async (req, res, next) => {
  const { id } = req.params
  try {
    const validation = await validateMunicipalityUpdate(req)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: validation.errors,
      })
    }
    const data = await updateMunicipality(id, validation.data)
    // Return result
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Updated municipality with id: ${id}`,
      data,
    })
  } catch (e) {
    next(e)
  }
}
