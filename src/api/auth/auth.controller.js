const { StatusCodes, ReasonPhrases } = require('http-status-codes')

const { UnauthorizedError } = require('../../modules/errors')
const { validateLogon, validateSignup } = require('./auth.validators')
const { generateTokens, passwordsMatch } = require('./auth.service')
const { addUser, getUserByEmail } = require('../users/user.service')

const sanitizedResponse = (user, tokens) => {
  return {
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    ...tokens,
  }
}

class AuthController {
  async logon(req, res) {
    const validation = await validateLogon(req.body)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: validation.errors,
      })
    }

    const user = await getUserByEmail(validation.data.email)
    if (!user) throw new UnauthorizedError()
    // Verify password
    const passwordOK = await passwordsMatch(user, validation.data.password)
    if (!passwordOK) throw new UnauthorizedError()

    // get tokens
    const tokens = await generateTokens(user)

    // Return result
    res.json({ success: true, message: 'Logged on', data: sanitizedResponse(user, tokens) })
  }

  async register(req, res, next) {
    const validation = await validateSignup(req.body)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: ReasonPhrases.BAD_REQUEST,
        errors: validation.errors,
      })
    }

    const user = await addUser(validation.data)
    // get tokens
    const tokens = await generateTokens(user)

    // Return result
    res.json({
      success: true,
      message: 'Registered user',
      data: sanitizedResponse(user, tokens),
    })
  }
}

module.exports = new AuthController()
