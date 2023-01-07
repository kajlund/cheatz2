const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const UserRepository = require('./user.repository')
const UserService = require('./user.service')

const { NotFoundError } = require('../../modules/errors')
const { validateNewUser, validateUserUpdate } = require('./user.validators')

class UserController {
  async addUser(req, res) {
    const validation = await validateNewUser(req.body)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: validation.errors,
      })
    }

    const data = await UserService.addUser(validation.data)
    // Return result
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Created user',
      data,
    })
  }

  async deleteUser(req, res) {
    const { id } = req.params
    const data = await UserRepository.destroy(id, UserService.userSelect)
    if (!data) throw new NotFoundError()
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Deleted user id: ${id}`,
      data,
    })
  }

  async listUsers(req, res) {
    const data = await UserRepository.findMany({}, UserService.userSelect)
    res.status(StatusCodes.OK).json({
      success: true,
      message: 'List all users',
      data,
    })
  }

  async getUserById(req, res) {
    const { id } = req.params
    const data = await UserService.getUserById(id)
    if (!data) throw new NotFoundError()
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Found user by id: ${id}`,
      data,
    })
  }

  async updateUser(req, res) {
    const { id } = req.params
    const validation = await validateUserUpdate(req.body)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: validation.errors,
      })
    }
    const data = await UserRepository.update(id, validation.data, UserService.userSelect)
    // Return result
    res.status(StatusCodes.OK).json({
      success: true,
      message: `Updated user with id: ${id}`,
      data,
    })
  }
}

module.exports = new UserController()
