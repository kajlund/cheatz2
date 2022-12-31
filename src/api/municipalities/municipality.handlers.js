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
  try {
    const data = await deleteMunicipalityById(req.params.id)
    res.status(200).json({
      success: true,
      message: 'Deleted',
      data,
    })
  } catch (e) {
    next(e)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const data = await getAllMunicipalities()
    res.json({ success: true, message: 'List municipalities', data })
  } catch (e) {
    next(e)
  }
}

exports.getById = async (req, res, next) => {
  try {
    const data = await getMunicipalityById(req.params.id)
    if (!data) throw new NotFoundError()
    res.json({ success: true, message: 'Find by id', data })
  } catch (e) {
    next(e)
  }
}

exports.getByNamePart = async (req, res, next) => {
  const { name } = req.params
  try {
    const data = await getMunicipalitiesByName(name)
    res.json({ success: true, message: `Find by name: ${name} `, data })
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
    res.send({
      success: true,
      message: 'Added municipality',
      data,
    })
  } catch (e) {
    next(e)
  }
}

exports.updateMunicipality = async (req, res, next) => {
  try {
    const validation = await validateMunicipalityUpdate(req)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: validation.errors,
      })
    }
    const data = await updateMunicipality(req.params.id, validation.data)
    // Return result
    res.send({
      success: true,
      message: 'Updated municipality',
      data,
    })
  } catch (e) {
    next(e)
  }
}
