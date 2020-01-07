const { Pool, Client } = require('pg');
const path = require('path');

const options = require('./pg.config.js');
const importData = require('./importData.js');

const pool = new Pool({
  host: options.host,
  port: options.port,
  user: options.user,
  password: options.password,
  database: options.database,
});

const seedPG = () => {
  pool.connect()
    .catch((err) => {
      console.error(err);
    })
    .then((client) => {
      const query = `CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        birthday DATE
      );`;

      return client.query(query)
      .then(() => {
        // const query = `CREATE TABLE IF NOT EXISTS listings (
        //   id SERIAL PRIMARY KEY,
        //   name VARCHAR(255) NOT NULL,
        //   price_base MONEY NOT NULL,
        //   price_weekend MONEY,
        //   price_holiday MONEY,
        //   price_guest MONEY,
        //   price_cleaning MONEY,
        //   price_service MONEY,
        //   max_guests INTEGER NOT NULL,
        //   min_nights INTEGER,
        //   max_nights INTEGER,
        //   rating_average INTEGER,
        //   review_count INTEGER,
        //   country VARCHAR(2) NOT NULL
        // );`;
        const query = `CREATE TABLE IF NOT EXISTS listings (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price_base NUMERIC(10, 2) NOT NULL,
          price_weekend NUMERIC(10, 2),
          price_holiday NUMERIC(10, 2),
          price_guest NUMERIC(10, 2),
          price_cleaning NUMERIC(10, 2),
          price_service NUMERIC(10, 2),
          max_guests INTEGER NOT NULL,
          min_nights INTEGER,
          max_nights INTEGER,
          rating_average INTEGER,
          review_count INTEGER,
          country VARCHAR(2) NOT NULL
        );`;

        return client.query(query); 
      })
      .then(() => {
        // const query = `CREATE TABLE IF NOT EXISTS reservations (
        //   id SERIAL PRIMARY KEY,
        //   listing_id INTEGER REFERENCES listings(id),
        //   user_id INTEGER REFERENCES users(id),
        //   start_date DATE,
        //   end_date DATE,
        //   adult_count INTEGER,
        //   child_count INTEGER,
        //   infant_count INTEGER,
        //   total_payment MONEY
        // );`;
        const query = `CREATE TABLE IF NOT EXISTS reservations (
          id SERIAL PRIMARY KEY,
          listing_id INTEGER REFERENCES listings(id),
          user_id INTEGER REFERENCES users(id),
          start_date DATE,
          end_date DATE,
          adult_count INTEGER,
          child_count INTEGER,
          infant_count INTEGER,
          total_payment NUMERIC(10, 2)
        );`;

        return client.query(query);
      })
      .then(() => {
        console.log('Database tables initialized.');
        client.release();
      })
      .catch((err) => {
        console.error(err);
      });
    })
    .then(() => {
      pool.end();

      importData();
    });
}

seedPG();

module.exports = seedPG;