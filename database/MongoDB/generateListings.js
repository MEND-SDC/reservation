const Promise = require('bluebird');
const fsp = Promise.promisifyAll(require("fs"));
const path = require('path');
const seedFolder = path.resolve(__dirname, "./seedFiles/listings/");
const faker = require('faker');
const reservationsGenerator = require('./reservationsGenerator.js');

const generateListings = () => {

  return new Promise((resolve, reject) => {

    var startTime = new Date();
    var currTime;
    
    var id_count = 1;
    var listingArr = [];

    const listingArrGenerator = () => {
      // for (var i = 0; i < 1000; i++) {
      for (var i = 0; i < 100000; i++) {
        var listing = {
          _id: id_count++,
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
          country: faker.address.countryCode()
        };
        listing.reservations = reservationsGenerator(listing.max_guests);
        listingArr.push(listing);
      }
    }

    listingArrGenerator();
    fsp.writeFileAsync(seedFolder + "/0.json", JSON.stringify(listingArr))
      .then(() => {
        console.log('1/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = [];
        listingArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/1.json", JSON.stringify(listingArr));
      })
      .then(() => {
        console.log('2/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = [];
        listingArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/2.json", JSON.stringify(listingArr));
      })
      .then(() => {
        console.log('3/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = [];
        listingArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/3.json", JSON.stringify(listingArr));
      })
      .then(() => {
        console.log('4/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = [];
        listingArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/4.json", JSON.stringify(listingArr));
      })
      .then(() => {
        console.log('5/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = [];
        listingArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/5.json", JSON.stringify(listingArr));
      })
      .then(() => {
        console.log('6/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = [];
        listingArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/6.json", JSON.stringify(listingArr));
      })
      .then(() => {
        console.log('7/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = [];
        listingArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/7.json", JSON.stringify(listingArr));
      })
      .then(() => {
        console.log('8/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = [];
        listingArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/8.json", JSON.stringify(listingArr));
      })
      .then(() => {
        console.log('9/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = [];
        listingArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/9.json", JSON.stringify(listingArr));
      })
      .then(() => {
        console.log('10/10 listings written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        listingArr = null;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });

  });
};

// generateListings();

module.exports = generateListings;