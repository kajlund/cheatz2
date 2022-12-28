/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tokens', function (table) {
    table.uuid('id', { useBinaryUuid: false, primaryKey: true })
    table.uuid('user_id').notNullable()
    table.string('token', 100)
    table.boolean('revoked').defaultTo(false)
    table.timestamps(false, true, false)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tokens')
}
