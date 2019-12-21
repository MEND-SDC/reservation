const { Pool, Client } = require('pg');
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
    return console.error('Error acquiring client', err.stack)
  }
  client.query('SELECT NOW()', (err, result) => {
    release()
    if (err) {
      return console.error('Error executing query', err.stack)
    }
    console.log(result.rows)
  });
})

module.exports = pool;