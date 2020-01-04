const { Pool, Client } = require('pg');
const path = require('path');

const pool = require(path.resolve(__dirname, "../database/PostgreSQL/pg.js"));

const models = {

  getFromModel: (req, res) => {
    let listingId = req.params.listingId;
    let data = {};

    pool.connect((err, client, release) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      const text1 = `SELECT * FROM listings WHERE id = $1;`;
      const text2 = `SELECT * FROM reservations WHERE listing_id = $1;`;
      const values = [listingId];

      client.query(text1, values)
      .then((result) => {
        data.listing = result;
        return client.query(text2, values);
      })
      .then((result) => {
        data.reservations = result;
        res.status(200).send(data);
        client.release();
      })
      .catch((err) => {
        console.error(err);
      });
    });
  },

  get: (listing_id) => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        const text = `SELECT * FROM listings INNER JOIN reservations ON reservations.listing_id = listings.id
                      WHERE listings.id = $1;`;
        const values = [listing_id];

        client.query(text, values)
          .then((res) => {
            // console.log(res);
            resolve(res);
            client.release();
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    });
  },

  getListing: (listing_id) => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        const text = `SELECT * FROM listings WHERE listings.id = $1;`;
        const values = [listing_id];

        client.query(text, values)
          .then((res) => {
            // console.log(res);
            resolve(res);
            client.release();
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    });
  },

  getReservations: (listing_id) => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        const text = `SELECT * FROM reservations WHERE listing_id = $1;`;
        const values = [listing_id];

        client.query(text, values)
          .then((res) => {
            // console.log(res);
            resolve(res);
            client.release();
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    });
  },

  post: (reservation) => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) {
          console.error(err);
          reject(err);
        }
  
        const text = `INSERT INTO reservations (listing_id, user_id, start_date, end_date, adult_count, child_count, infant_count, total_payment)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
        const values = [reservation.listing_id, reservation.user_id, reservation.start_date, reservation.end_date, reservation.adult_count, reservation.child_count, reservation.infant_count, reservation.total_payment];
  
        client.query(text, values)
          .then((res) => {
            // console.log(res);
            resolve(res);
            client.release();
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    });
  },

  update: (reservation) => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        const text = `UPDATE reservations
                      SET listing_id = $1, user_id = $2, start_date = $3, end_date = $4, adult_count = $5, child_count = $6, infant_count = $7, total_payment = $8)
                      WHERE id = $9
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
        const values = [reservation.listing_id, reservation.user_id, reservation.start_date, reservation.end_date, reservation.adult_count, reservation.child_count, reservation.infant_count, reservation.total_payment, reservation.id];
  
        client.query(text, values)
          .then((res) => {
            // console.log(res);
            resolve(res);
            client.release();
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    });
  },

  delete: (reservation) => {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, release) => {
        if (err) {
          console.error(err);
          reject(err);
        }

        const text = `DELETE FROM reservations WHERE id = $1`
        const values = [reservation.id];

        client.query(text, values)
          .then((res) => {
            // console.log(res);
            resolve(res);
            client.release();
          })
          .catch((err) => {
            console.error(err);
            reject(err);
          });
      });
    });
  }

}

// models.get(50);

module.exports = models;






































// const mysql = require('mysql');
// const Promise = require('bluebird');

// const connection = mysql.createConnection({
//   host: 'database',
//   user: 'root',
//   password: 'Password',
//   database: 'reservations',
// });

// connection.connect();

// const connectionAsync = Promise.promisifyAll(connection);

// module.exports = {
//   houses: (fakeData) => {
//     const queryVal = [fakeData.price_per_night, fakeData.cleaning_fees, fakeData.service_fees, fakeData.average_rating, fakeData.number_of_reviews];
//     const query = 'INSERT INTO reservation (price_per_night, cleaning_fees, service_fees, average_rating, number_of_reviews) VALUES(?, ?, ?, ?, ?)';
//     return connectionAsync.queryAsync(query, queryVal).then((data) => {
//       console.log(data);
//     }).catch((err) => {
//       console.log(err);
//     });
//   },
//   dates: (fakeData) => {
//     const queryVal = [fakeData.room_id, fakeData.reservation_start, fakeData.reservation_end];
//     const query = 'INSERT INTO details (room_id, reservation_start, reservation_end) VALUES(?, ?, ?)';
//     return connectionAsync.queryAsync(query, queryVal).then((data) => {
//       console.log(data);
//     }).catch((err) => {
//       console.log(err);
//     });
//   },
//   getPrice: (callback, id) => {
//     connection.query(`SELECT * from reservation where id = ${id};`, (err, results) => {
//       if (err) {
//         callback(err);
//       } else {
//         callback(null, results);
//       }
//     });
//   },
//   getDates: (callback, id) => {
//     connection.query(`SELECT * from details where room_id = ${id};`, (err, results) => {
//       if (err) {
//         callback(err);
//       } else {
//         callback(null, results);
//       }
//     });
//   },
// };
