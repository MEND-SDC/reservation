const { Pool } = require('pg');
const options = require('./pg.config.js');

const pool = new Pool({
  host: options.host,
  port: options.port,
  user: options.user,
  password: options.password,
  database: options.database,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error(err);
  }


  pool.end();
})