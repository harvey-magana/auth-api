// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

	development: {
		client: 'postgresql',
		connection: {
			host: 'localhost',
			port: 5432,
			database: 'auth_api_db',
			user:     'newuser',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		debug: true
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'auth_api_db',
			user:     'newuser',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}

};
