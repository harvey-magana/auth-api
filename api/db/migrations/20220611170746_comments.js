/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = async function(knex) {
	await knex.schema.hasTable('comments').then(function(exists) {
		if (!exists) {
			return knex.schema.createTable('comments', (table) => {
				table.increments('id', 6).primary();
				table.integer('post_id');
				table.unique('user_id');
				table.unique('user_id')
					.references('id')
					.inTable('users')
					.onDelete('CASCADE');
				table.string('body', 255);
				table.timestamps(false, true);
			});
		}
	});

	await knex.raw(`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE 
    ON comments 
    FOR EACH ROW 
    EXECUTE PROCEDURE trigger_set_timestamp(); 
`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists('comments');
};