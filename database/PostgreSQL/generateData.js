const Promise = require('bluebird');
const fsp = Promise.promisifyAll(require("fs"));
const path = require('path');
const cliProgress = require('cli-progress');

const generateUsers = require('./generateUsers.js');
const generateListings = require('./generateListings.js');
const generateReservations = require('./generateReservations.js');

const seedFolderPath = path.resolve(__dirname, "./seedFiles/");

const generateData = () => {

  const constants = {
    users: {
      totalSize: 10000000,
      // totalSize: 100,
      batchCount: 10
    },
    listings: {
      totalSize: 10000000,
      // totalSize: 100,
      batchCount: 10
    },
    reservations: {
      // totalSize: 100000000,
      // totalSize: 1000,
      // batchCount: 100
      batchCount: 10
    }
  };

  const usersList = generateUsers(constants.users.batchCount, constants.users.totalSize);
  const listingsList = generateListings(constants.listings.batchCount, constants.listings.totalSize);
  const reservationsList = generateReservations(constants.reservations.batchCount, constants.listings.totalSize, constants.users.totalSize);

  const usersArray = new Array(constants.users.batchCount).fill(0);
  const listingsArray = new Array(constants.listings.batchCount).fill(0);
  const reservationsArray = new Array(constants.reservations.batchCount).fill(0);

  const usersBar = new cliProgress.SingleBar({format: '{bar} {percentage}% | Duration: {duration_formatted} | {value}/{total}'}, cliProgress.Presets.shades_classic);
  const listingsBar = new cliProgress.SingleBar({format: '{bar} {percentage}% | Duration: {duration_formatted} | {value}/{total}'}, cliProgress.Presets.shades_classic);
  const reservationsBar = new cliProgress.SingleBar({format: '[{bar}] {percentage}% | Duration: {duration_formatted} | {value}/{total}'}, cliProgress.Presets.shades_classic);

  console.log('\nUsers generation:');
  usersBar.start(10, 0);
  usersArray.reduce((accumulator, item, index) => {

    return accumulator.then(() => {
      var batch = usersList.next().value;
      return fsp.writeFileAsync(`${seedFolderPath}/users/${index}.csv`, batch);
    }).then(() => {
      usersBar.increment(1);
    }).catch((err) => {
      console.error(err);
    });
  }, Promise.resolve()).then(() => {

    usersBar.stop();
    console.log('\nListings generation:');
    listingsBar.start(10, 0);

    listingsArray.reduce((accumulator, item, index) => {
  
      return accumulator.then(() => {
        var batch = listingsList.next().value;
        return fsp.writeFileAsync(`${seedFolderPath}/listings/${index}.csv`, batch);
      }).then(() => {
        listingsBar.increment(1);
      }).catch((err) => {
        console.error(err);
      });
    }, Promise.resolve()).then(() => {

      listingsBar.stop();
      console.log('\nReservations generation:');

      reservationsArray.reduce((accumulator, item, index) => {
        reservationsBar.start(100, 0);
    
        return accumulator.then(() => {
          var batch = reservationsList.next().value;
          return fsp.writeFileAsync(`${seedFolderPath}/reservations/${index}.csv`, batch);
        }).then(() => {
          reservationsBar.increment(10);
        }).catch((err) => {
          console.error(err);
        });
      }, Promise.resolve()).then(() => {

        reservationsBar.stop();
        console.log('\n');

      });

    }).catch((err) => {
      console.error(err);
    });

  });
};

generateData();

module.export = generateData;