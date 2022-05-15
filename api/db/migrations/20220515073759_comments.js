/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.hasTable('comments').then(function(exists) {
    if (!exists) {
      return knex.schema.createTable('comments', (table) => {
        table.increments('id', 6).primary();
        table.integer('user_id');
        table.integer('post_id')
          .references('id')
          .inTable('posts')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.foreign('user_id')
          .references('id')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        table.string('body', 255);
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
  return knex.schema.dropTableIfExists('comments');
};
