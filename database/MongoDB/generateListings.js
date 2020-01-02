const faker = require('faker');
const reservationsGenerator = require('./generateReservations.js');

const generateListing = (listing_id, usersTotalCount) => {
  var listing = {
    _id: listing_id,
    name: faker.address.streetName(),
    price_base: Math.floor(Math.random() * (200 - 20)) + 20,
    price_weekend: Math.floor(Math.random() * 6) * 20,
    price_holiday: Math.floor(Math.random() * 6) * 20,
    price_guest: Math.floor(Math.random() * 6) * 20,
    price_cleaning: Math.floor(Math.random() * (200 - 20)) * 20,
    price_service: Math.floor(Math.random() * (200 - 20)) * 20,
    max_guests: Math.floor(Math.random() * 5) + 1,
    min_nights: Math.floor(Math.random() * 5) + 1,
    max_nights: Math.floor(Math.random() * 100) + 1,
    rating_average: Math.floor(Math.random() * 100) + 1,
    country: faker.address.countryCode(),
  };
  listing.reservations = reservationsGenerator(listing.max_guests);
  return listing;
}

const generateListings = function* (batchSize, totalSize, usersTotalCount) {

  let batchBin = [];
  for (var i = 1; i <= totalSize; i++) {
    batchBin.push(generateListing(i, usersTotalCount));
    if (i % batchSize === 0) {
      yield batchBin;
      batchBin = [];
    }
  }
};

// generateListings();

module.exports = generateListings;