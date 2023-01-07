const { hashPassword } = require('../auth/auth.service')
const UserRepository = require('./user.repository')

class UserService {
  constructor() {
    this.userSelect = { id: true, createdAt: true, username: true, email: true, password: false, role: true }
    this.userInclude = null
  }

  async addUser(data) {
    data.password = await hashPassword(data.password)
    const user = await UserRepository.create(data, this.userSelect)
    return user
  }

  async getUserByEmail(email) {
    return await UserRepository.findUnique({ email }) // Get with password
  }

  async getUserById(id) {
    return await UserRepository.findUnique({ id }, this.userSelect)
  }

  async isUserRegistered(email) {
    const user = await exports.getUserByEmail(email)
    return !!user
  }
}

module.exports = new UserService()
