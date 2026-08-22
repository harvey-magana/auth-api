/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// updated code start 
exports.up = async function(knex) {
  if (knex.client.config.client !== 'postgresql') {
    return;
  }

  await knex.raw(`
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
      RETURNS TRIGGER
      LANGUAGE plpgsql
      AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$;
  `);
};

exports.down = async function(knex) {
  if (knex.client.config.client !== 'postgresql') {
    return;
  }

  await knex.raw(`
    DROP FUNCTION IF EXISTS trigger_set_timestamp();
  `);
};
// updated code end 
