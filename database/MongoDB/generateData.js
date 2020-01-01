const Promise = require('bluebird');
const fsp = Promise.promisifyAll(require("fs"));
const path = require('path');
const seedFolderPath = path.resolve(__dirname, "./seedFiles/");
const generateUsers = require('./generateUsers.js');
const generateListings = require('./generateListings.js');

const generateData = () => {
  const usersTotalCount = 10000000;
  // const usersTotalCount = 100;
  const usersBatchCount = 10;
  const usersBatchSize = usersTotalCount / usersBatchCount;
  const listingsTotalCount = 10000000;
  // const listingsTotalCount = 1000;
  const listingsBatchCount = 100;
  const listingsBatchSize = listingsTotalCount / listingsBatchCount;
  let usersCounter = 0;
  let listingsCounter = 0;

  var startTime = new Date();
  var userTime, listingTime;

  const usersList = generateUsers(usersBatchSize, usersTotalCount);
  const listingsList = generateListings(listingsBatchSize, listingsTotalCount, usersTotalCount);

  const usersArray = new Array(usersBatchCount).fill(0);
  const listingsArray = new Array(listingsBatchCount).fill(0);

  usersArray.reduce((accumulator, item, index) => {
    return accumulator.then(() => {
      var batch = usersList.next().value;
      return fsp.writeFileAsync(`${seedFolderPath}/users/${index}.json`, JSON.stringify(batch));
    }).then(() => {
      console.log(`Users generation progress: ${++usersCounter}/${usersBatchCount}`);
      userTime = new Date();
      console.log('Users generation time: ' + ((userTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
    }).catch((err) => {
      console.error(err);
    });
  }, Promise.resolve()).then(() => {

    console.log('Users generation complete.');
    console.log('===========================');

    listingsArray.reduce((accumulator, item, index) => {
      return accumulator.then(() => {
        var batch = listingsList.next().value;
        return fsp.writeFileAsync(`${seedFolderPath}/listings/${index}.json`, JSON.stringify(batch));
      }).then(() => {
        console.log(`Listings generation progress: ${++listingsCounter}/${listingsBatchCount}`);
        listingTime = new Date();
        console.log('Listings generation time: ' + ((listingTime.getTime() - userTime.getTime()) / 1000) + ' seconds');
      }).catch((err) => {
        console.error(err);
      })
    }, Promise.resolve()).then(() => {

      console.log('Listings generation complete.')
      console.log('===========================');
      console.log('Data generation complete.')
      console.log('Total generation time: ' + ((listingTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
    });

  });
};

generateData();

module.export = generateData;