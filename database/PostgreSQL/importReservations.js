const assert = require('assert');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { Pool, Client } = require('pg');
const path = require('path');
const cliProgress = require('cli-progress');

const options = require('./pg.config.js');
// const seedFilesPath = `C:/Users/digitalized/Documents/seedFiles`;
const seedFilesPath = `D:/HRSF124/SDC/reservations/database/PostgreSQL/seedFiles`;

const pool = new Pool({
  host: options.host,
  port: options.port,
  user: options.user,
  password: options.password,
  database: options.database,
});

const importReservations = () => {
  const reservationsBatchCount = 100;
  const reservationsArray = new Array(reservationsBatchCount).fill(0);
  const reservationsBar = new cliProgress.SingleBar({format: '[{bar}] {percentage}% | Duration: {duration_formatted} | {value}/{total}'}, cliProgress.Presets.shades_classic);

  pool.connect()
    .catch((err) => {
      console.error(err);
    })
    .then((client) => {
      console.log(seedFilesPath);

      console.log('\nImport reservations:');
      reservationsBar.start(100, 0);
      reservationsArray.reduce((accumulator, item, index) => {
        return accumulator.then(() => {
          const query = `COPY reservations(listing_id, user_id, start_date, end_date, adult_count, child_count, infant_count, total_payment)
                         FROM '${seedFilesPath}/reservations/${index}.csv' DELIMITERS ',' CSV;`;
          return client.query(query);
        }).then(() => {
          reservationsBar.increment(1);
        }).catch((err) => {
          console.error(err);
        });
      }, Promise.resolve()).then(() => {
        reservationsBar.stop();
        console.log('\nDatabase import complete.');
        client.release();
      });
    })
    .then(() => {
      pool.end();
    });
}

importReservations();

module.exports = importReservations;