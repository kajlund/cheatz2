const logger = require('../modules/logger')

const knexConfig = require('./knexfile')
const dbConfig = knexConfig[process.env.NODE_ENV || 'development']

logger.info('Database configuration: %O', dbConfig)

const knex = require('knex')(dbConfig)

// Uncomment to log SQL statements
// knex.on('query', function (queryData) {
//   logger.debug(queryData)
// })

module.exports = knex
