/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const knex_cleaner = require("knex-cleaner");

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const options = { mode: 'truncate', ignoreTables: ["knex_migrations", "knex_migrations_lock"] };
  await knex_cleaner.clean(knex, options);
};
