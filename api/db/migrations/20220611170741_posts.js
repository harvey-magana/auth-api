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
				table.bigInteger('user_id');
				table.foreign('user_id')
					.references('id')
					.inTable('users')
					.onDelete('CASCADE');
				table.timestamps(false, true);
			});
		}
	});

	await knex.raw(`
    CREATE TRIGGER set_timestamp
    BEFORE UPDATE  
    ON posts 
    FOR EACH ROW 
    EXECUTE PROCEDURE trigger_set_timestamp(); 
`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
	return knex.schema.dropTableIfExists('posts');
};