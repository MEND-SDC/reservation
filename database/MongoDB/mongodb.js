const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const Promise = require('bluebird');
// const MongoClient = Promise.promisifyAll(require('mongodb').MongoClient);
const faker = require('faker');
const reservationsGenerator = require('./reservationsGenerator.js');

const url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  const users = client.db('reservations').collection('users');
  const listings = client.db('reservations').collection('listings');

  /* SEED USERS */

  var id_count = 1;
  var userArr = [];
  var listingArr = [];
  for (var i = 0; i < 100000; i++) {
  // for (var i = 0; i < 1000000; i++) {
    userArr.push({
      _id: id_count++,
      name: faker.name.findName(),
      email: faker.internet.email(),
      birthday: faker.date.between('1920-01-01', '2000-12-31')
    });
  }
  users.insertMany(userArr)
    .then(() => {
      console.log('1/10 users inserted.');
      userArr = [];
      for (var i = 0; i < 100000; i++) {
      // for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31'),
        });
      }
      return users.insertMany(userArr);
    })
    .then(() => {
      console.log('2/10 users inserted.');
      userArr = [];
      for (var i = 0; i < 100000; i++) {
      // for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31'),
        });
      }
      return users.insertMany(userArr);
    })
    .then(() => {
      console.log('3/10 users inserted.');
      userArr = [];
      for (var i = 0; i < 100000; i++) {
      // for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31'),
        });
      }
      return users.insertMany(userArr);
    })
    .then(() => {
      console.log('4/10 users inserted.');
      userArr = [];
      for (var i = 0; i < 100000; i++) {
      // for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31'),
        });
      }
      return users.insertMany(userArr);
    })
    .then(() => {
      console.log('5/10 users inserted.');
      userArr = [];
      for (var i = 0; i < 100000; i++) {
      // for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31'),
        });
      }
      return users.insertMany(userArr);
    })
    .then(() => {
      console.log('6/10 users inserted.');
      userArr = [];
      for (var i = 0; i < 100000; i++) {
      // for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31'),
        });
      }
      return users.insertMany(userArr);
    })
    .then(() => {
      console.log('7/10 users inserted.');
      userArr = [];
      for (var i = 0; i < 100000; i++) {
      // for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31'),
        });
      }
      return users.insertMany(userArr);
    })
    .then(() => {
      console.log('8/10 users inserted.');
      userArr = [];
      for (var i = 0; i < 100000; i++) {
      // for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31'),
        });
      }
      return users.insertMany(userArr);
    })
    .then(() => {
      console.log('9/10 users inserted.');
      userArr = [];
      for (var i = 0; i < 100000; i++) {
      // for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31'),
        });
      }
      return users.insertMany(userArr);
    })
    .then(() => {
      console.log('10/10 users inserted.');
      userArr = null;

    /* SEED LISTINGS */

      // for (var i = 0; i < 100000; i++) {
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('1/10 listings inserted.');
      listingArr = [];
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('2/10 listings inserted.');
      listingArr = [];
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('3/10 listings inserted.');
      listingArr = [];
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('4/10 listings inserted.');
      listingArr = [];
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('5/10 listings inserted.');
      listingArr = [];
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('6/10 listings inserted.');
      listingArr = [];
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('7/10 listings inserted.');
      listingArr = [];
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('8/10 listings inserted.');
      listingArr = [];
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('9/10 listings inserted.');
      listingArr = [];
      for (var i = 0; i < 10000; i++) {
        var listing = {
          name: faker.address.streetName(),
          price_base:  Math.floor(Math.random() * (200-20)) + 20,
          price_weekend: Math.floor(Math.random() * 6) * 20,
          price_holiday: Math.floor(Math.random() * 6) * 20,
          price_guest: Math.floor(Math.random() * 6) * 20,
          price_cleaning:  Math.floor(Math.random() * (200-20)) * 20,
          price_service:  Math.floor(Math.random() * (200-20)) * 20,
          max_guests: Math.floor(Math.random() * 5) + 1,
          min_nights: Math.floor(Math.random() * 5) + 1,
          max_nights: Math.floor(Math.random() * 100) + 1,
          rating_average: Math.floor(Math.random() * 100) + 1,
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
      return listings.insertMany(listingArr);
    })
    .then(() => {
      console.log('10/10 listings inserted.');
      listingArr = null;

      client.close();
    });
});





// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mend_reservations');

// let roomsSchema = mongoose.Schema({
//   // TODO: your schema here!
//   _id: Number,
//   name: String,
//   price_base: Number,
//   price_weekend: Number,
//   price_holiday: Number,
//   price_guest: Number,
//   price_cleaning: Number,
//   price_service: Number,
//   max_guests: Number,
//   min_nights: Number,
//   max_nights: Number,
//   rating_average: Number,
//   address: String,
//   country: String,
//   reservations: [],
//   /*
//     user_id Number,
//     start_date Date,
//     end_date Date,
//     adult_count Number,
//     child_cound Number,
//     infant_count Number,
//     total_payment Number,
//   */
// });

// let reviewsSchema = mongoose.Schema({
//   _id: Number,
//   room_id: Number,
//   user_id: Number,
//   rating: Number,
//   comment: String
// });

// let usersSchema = mongoose.Schema({
//   _id: Number,
//   name: String,
//   email: String,
//   birthday: Date
// });

// // let users = mongoose.model('User', usersSchema);

// referenceStr.localeCompare(compareString[, locales[, options]])
// str.charCodeAt(index)