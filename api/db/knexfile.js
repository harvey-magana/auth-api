const path = require('path');

const migrations = {
  directory: path.join(__dirname, 'migrations'),
  tableName: 'knex_migrations',
};

const seeds = {
  directory: path.join(__dirname, 'seeds'),
};

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'auth_api_db',
      user: 'harveymagana',
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
      afterCreate(conn, done) {
        conn.query('SET timezone="UTC";', (err) => {
          done(err, conn);
        });
      },
    },
    migrations,
    seeds,
    debug: false,
  },

  testing: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'testing.db3'),
    },
    useNullAsDefault: true,
    migrations,
    seeds,
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || {
      database: 'auth_api_db',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
    seeds,
  },
};