const path = require('path')

const dotenv = require('dotenv')
const { merge } = require('lodash')

// Load environment variables BEFORE setting up config
dotenv.config({ path: path.join(__dirname, '..', '.env') })

const DATABASE_URL = process.env.DATABASE_URL
const ENV = process.env.NODE_ENV || 'development'
const PORT = parseInt(process.env.PORT) || 8080
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS) || 12
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET

const baseConfig = {
  db: {
    url: DATABASE_URL,
  },
  port: PORT,
  nodeEnv: ENV,
  saltRounds: SALT_ROUNDS,
  jwtAccessTokenExpiresIn: 3600 * 24, // 24hr
  jwtAccessTokenSecret: JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: JWT_REFRESH_TOKEN_SECRET,
  log: {
    enabled: true,
    level: 'trace',
  },
  mail: {
    connection: process.env.MAIL_CONNECTION || 'smtp',
    from: process.env.MAIL_FROM,
    smtp: {
      driver: 'smtp',
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    },
  },
}

let envConfig = {}

if (ENV === 'production') {
  envConfig.log = {
    enabled: true,
    level: 'info',
  }
}

if (ENV === 'testing') {
  envConfig.log = {
    enabled: false,
    level: 'info',
  }
}

module.exports = merge(baseConfig, envConfig)
