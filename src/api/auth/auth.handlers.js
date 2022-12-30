const { StatusCodes } = require('http-status-codes')

const { UnauthorizedError } = require('../../modules/errors')
const { generateTokens, passwordsMatch } = require('./auth.service')
const { validateLogon, validateSignup } = require('./auth.validators')
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

exports.logon = async (req, res, next) => {
  try {
    const validation = await validateLogon(req.body)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
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
    res.send(sanitizedResponse(user, tokens))
  } catch (e) {
    next(e)
  }
}

exports.signup = async (req, res, next) => {
  try {
    const validation = await validateSignup(req.body)
    if (!validation.isValid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        errors: validation.errors,
      })
    }

    const user = await addUser(validation.data)
    // get tokens
    const tokens = await generateTokens(user)

    // Return result
    res.send(sanitizedResponse(user, tokens))
  } catch (e) {
    next(e)
  }
}
