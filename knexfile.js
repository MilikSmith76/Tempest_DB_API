var config = require('./public/javascripts/config.js')
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: config.DBAPI_HOST,
      user: config.DBAPI_USER,
      password: config.DBAPI_PASSWORD,
      database: config.DBAPI_DATABASE
    },
    pool: {
      min: config.MIN_POOL,
      max: config.MAX_POOL
    },
    migrations: {
      directory: './public/javascripts/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './public/javascripts/seeds'
    }
  },

  /*staging: {
    client: 'mysql',
    connection: {
      host: config.DBAPI_HOST,
      user: config.DBAPI_USER,
      password: config.DBAPI_PASSWORD,
      database: config.DBAPI_DATABASE
    },
    pool: {
      min: config.MIN_POOL,
      max: config.MAX_POOL
    },
    migrations: {
      directory: './public/javascripts/migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: config.DBAPI_HOST,
      user: config.DBAPI_USER,
      password: config.DBAPI_PASSWORD,
      database: config.DBAPI_DATABASE
    },
    pool: {
      min: config.MIN_POOL,
      max: config.MAX_POOL
    },
    migrations: {
      directory: './public/javascripts/migrations',
      tableName: 'knex_migrations'
    }
  }*/

};
