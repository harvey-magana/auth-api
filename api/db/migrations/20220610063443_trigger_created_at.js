/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.raw(`
    CREATE OR REPLACE FUNCTION trigger_set_timestamp() 
      RETURNS TRIGGER 
      LANGUAGE plpgsql
      AS $$ 
    BEGIN 
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$
  `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.raw(`
    DROP FUNCTION IF EXISTS trigger_set_timestamp() CASCADE;
  `)
};
