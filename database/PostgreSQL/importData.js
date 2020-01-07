const assert = require('assert');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { Pool, Client } = require('pg');
const path = require('path');
const cliProgress = require('cli-progress');

const options = require('./pg.config.js');
// const seedFilesPath = path.resolve(__dirname, "./seedFiles");
// const seedFilesPath = `C:/Users/digitalized/Roaming/seedFiles`;
const seedFilesPath = `D:/HRSF124/SDC/reservations/database/PostgreSQL/seedFiles`;
const s3SeedPath = `https://mend-sf.s3-us-west-1.amazonaws.com/csv`;


const pool = new Pool({
  host: options.host,
  port: options.port,
  user: options.user,
  password: options.password,
  database: options.database,
});

const importData = () => {
  const usersBatchCount = 10;
  const listingsBatchCount = 10;
  const reservationsBatchCount = 100;

  const usersArray = new Array(usersBatchCount).fill(0);
  const listingsArray = new Array(listingsBatchCount).fill(0);
  const reservationsArray = new Array(reservationsBatchCount).fill(0);

  const usersBar = new cliProgress.SingleBar({format: '{bar} {percentage}% | Duration: {duration_formatted} | {value}/{total}'}, cliProgress.Presets.shades_classic);
  const listingsBar = new cliProgress.SingleBar({format: '{bar} {percentage}% | Duration: {duration_formatted} | {value}/{total}'}, cliProgress.Presets.shades_classic);
  const reservationsBar = new cliProgress.SingleBar({format: '[{bar}] {percentage}% | Duration: {duration_formatted} | {value}/{total}'}, cliProgress.Presets.shades_classic);

  pool.connect()
    .catch((err) => {
      console.error(err);
    })
    .then((client) => {
      console.log(seedFilesPath);

      console.log('\nImport users:');
      usersBar.start(10, 0);
      usersArray.reduce((accumulator, item, index) => {
        return accumulator.then(() => {
          // COPY sample_table FROM PROGRAM 'curl "http://www.example.com/file.csv" DELIMITERS ',' CSV;'
          const query = `COPY users(name, email, birthday)
                         FROM '${seedFilesPath}/users/${index}.csv' DELIMITERS ',' CSV;`;
          // const query = `COPY users(name, email, birthday)
          //                FROM PROGRAM 'curl "${s3SeedPath}/users/${index}.csv"' DELIMITERS ',' CSV;`
          return client.query(query);
          // return exec(`\copy users(name, email, birthday) FROM '${seedFilesPath}/users/${index}.csv' DELIMITERS ',' CSV;`);
        }).then(() => {
          usersBar.increment(1);
        }).catch((err) => {
          console.error(err);
        });
      }, Promise.resolve())
        .then(() => {
          usersBar.stop();

          console.log('\nImport listings:');
          listingsBar.start(10, 0);
          listingsArray.reduce((accumulator, item, index) => {
            return accumulator.then(() => {
              const query = `COPY listings(name, price_base, price_weekend, price_holiday, price_guest, price_cleaning, price_service, max_guests, min_nights, max_nights, rating_average, review_count, country)
                             FROM '${seedFilesPath}/listings/${index}.csv' DELIMITERS ',' CSV;`;
              // const query = `COPY listings(name, price_base, price_weekend, price_holiday, price_guest, price_cleaning, price_service, max_guests, min_nights, max_nights, rating_average, review_count, country)
              //                FROM PROGRAM 'curl "${s3SeedPath}/listings/${index}.csv"' DELIMITERS ',' CSV;`;
              return client.query(query);
              // return exec(`\copy listings(name, price_base, price_weekend, price_holiday, price_guest, price_cleaning, price_service, max_guests, min_nights, max_nights, rating_average, review_count, country) FROM '${seedFilesPath}/listings/${index}.csv' DELIMITERS ',' CSV;`);
            }).then(() => {
              listingsBar.increment(1);
            }).catch((err) => {
              console.error(err);
            });
          }, Promise.resolve()).then(() => {
            listingsBar.stop();

            console.log('\nImport reservations:');
            reservationsBar.start(100, 0);
            reservationsArray.reduce((accumulator, item, index) => {
              return accumulator.then(() => {
                const query = `COPY reservations(listing_id, user_id, start_date, end_date, adult_count, child_count, infant_count, total_payment)
                               FROM '${seedFilesPath}/reservations/${index}.csv' DELIMITERS ',' CSV;`;
                // const query = `COPY reservations(listing_id, user_id, start_date, end_date, adult_count, child_count, infant_count, total_payment)
                //                FROM PROGRAM 'curl "${s3SeedPath}/reservations/${index}.csv"' DELIMITERS ',' CSV;`;
                return client.query(query);
                // return exec(`\copy reservations(listing_id, user_id, start_date, end_date, adult_count, child_count, infant_count, total_payment) FROM '${seedFilesPath}/reservations/${index}.csv' DELIMITERS ',' CSV;`);
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

          });

        });
    })
    .then(() => {
      pool.end();
    });
}

module.exports = importData;