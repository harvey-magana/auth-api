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
			user:     'harveymagana',
			password: '20220529909am'
		},
		pool: {
			min: 2,
			max: 10,
			afterCreate: function (conn, done) {
				conn.query('SET timezone="UTC";', function (err) {
					if (err) {
						console.log(err);
					}
					done(err, conn);
				})
			}
		},
		migrations: {
			tableName: 'knex_migrations'
		},
		debug: false
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
