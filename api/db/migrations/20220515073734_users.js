/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.hasTable('users').then(function(exists) {
    if(!exists) {
      return knex.schema.createTable('users', (table) => {
        table.increments('id', 6).primary();
        table.string('username', 100).notNullable().unique();
        table.string('email', 100).notNullable().unique();
        table.string('password', 100).notNullable();
        table.string('confirm_password', 100).notNullable();
        table.string('role');
        table.binary('image_path');
        table.timestamps(false, true);
      })
    }
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users');
};