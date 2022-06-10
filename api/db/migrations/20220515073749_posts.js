/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async function(knex) {
  await knex.schema.hasTable('posts').then(function(exists) {
    if(!exists) {
      return knex.schema.createTable('posts', (table) => {
        table.increments('id', 6).primary();
        table.string('post_title', 100).notNullable();
        table.string('post_body', 255);
        table.integer('user_id')
        table.foreign('user_id')
          .references('id')
          .inTable('users')
          .onDelete('CASCADE');
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
  return knex.schema.dropTableIfExists('posts');
};