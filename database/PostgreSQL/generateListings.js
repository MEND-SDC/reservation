const faker = require('faker');
const reservationsGenerator = require('./generateReservations.js');

const generateListing = (listing_id) => {
  // id SERIAL PRIMARY KEY,
  //  name VARCHAR(255),
  // price_base MONEY,
  // price_weekend MONEY,
  // price_holiday MONEY,
  // price_guest MONEY,
  // price_cleaning MONEY,
  // price_service MONEY,
  // max_guests INTEGER,
  // min_nights INTEGER,
  // max_nights INTEGER,
  // rating_average INTEGER,
  // review_count INTEGER,
  // country VARCHAR(2)
  // return [
  //   listing_id,
  //   faker.address.streetName(),
  //   Math.floor(Math.random() * (200 - 20)) + 20,
  //   Math.floor(Math.random() * 6) * 20,
  //   Math.floor(Math.random() * 6) * 20,
  //   Math.floor(Math.random() * 6) * 20,
  //   Math.floor(Math.random() * (200 - 20)) * 20,
  //   Math.floor(Math.random() * (200 - 20)) * 20,
  //   Math.floor(Math.random() * 5) + 1,
  //   Math.floor(Math.random() * 5) + 1,
  //   Math.floor(Math.random() * 100) + 1,
  //   Math.floor(Math.random() * 100) + 1,
  //   Math.floor(Math.random() * 500) + 1,
  //   faker.address.countryCode()
  // ];

  return `${listing_id},${faker.address.streetName()},${Math.floor(Math.random() * (200 - 20)) + 20},${Math.floor(Math.random() * 6) * 20},${Math.floor(Math.random() * 6) * 20},${Math.floor(Math.random() * 6) * 20},${Math.floor(Math.random() * (200 - 20)) * 20},${Math.floor(Math.random() * (200 - 20)) * 20},${Math.floor(Math.random() * 5) + 1},${Math.floor(Math.random() * 5) + 1},${Math.floor(Math.random() * 100) + 1},${Math.floor(Math.random() * 100) + 1},${Math.floor(Math.random() * 500) + 1},${faker.address.countryCode()}\n`;
  // return `${faker.address.streetName()},${Math.floor(Math.random() * (200 - 20)) + 20},${Math.floor(Math.random() * 6) * 20},${Math.floor(Math.random() * 6) * 20},${Math.floor(Math.random() * 6) * 20},${Math.floor(Math.random() * (200 - 20)) * 20},${Math.floor(Math.random() * (200 - 20)) * 20},${Math.floor(Math.random() * 5) + 1},${Math.floor(Math.random() * 5) + 1},${Math.floor(Math.random() * 100) + 1},${Math.floor(Math.random() * 100) + 1},${Math.floor(Math.random() * 500) + 1},${faker.address.countryCode()}\n`;
}

const generateListings = function* (batchCount, totalSize) {
  var batchSize = totalSize / batchCount;
  // let batchBin = [];
  let batchBin = '';
  for (var i = 1; i <= totalSize; i++) {
    // batchBin.push(generateListing(i));
    batchBin += generateListing(i);
    if (i % batchSize === 0) {
      yield batchBin;
      // batchBin = [];
      batchBin = '';
    }
  }
};

// generateListings();

module.exports = generateListings;