const { Pool, Client } = require('pg');
const options = require('./pg.config.js');

const pool = new Pool({
  host: options.host,
  port: options.port,
  user: options.user,
  password: options.password,
  database: options.database,
});

module.exports = pool;