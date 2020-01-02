const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const seedFilesPath = path.resolve(__dirname, "./seedFiles");
const url = 'mongodb://localhost:27017/';

const importData = () => {
  const usersBatchCount = 10;
  const listingsBatchCount = 100;
  let usersCounter = 0;
  let listingsCounter = 0;

  var startTime = new Date();
  var userTime, listingTime;

  const usersArray = new Array(usersBatchCount).fill(0);
  const listingsArray = new Array(listingsBatchCount).fill(0);

  MongoClient.connect(url, function (err, client) {

    assert.equal(null, err);

    usersArray.reduce((accumulator, item, index) => {
      return accumulator.then(() => {
        return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/${index}.json --jsonArray`);
      }).then(() => {
        console.log(`Users import progress: ${++usersCounter}/${usersBatchCount}`);
        userTime = new Date();
        console.log('Users import time: ' + ((userTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
      }).catch((err) => {
        console.error(err);
      });
    }, Promise.resolve()).then(() => {

      console.log('Users import complete.');
      console.log('===========================');

      listingsArray.reduce((accumulator, item, index) => {
        return accumulator.then(() => {
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/${index}.json --jsonArray`)
        }).then(() => {
          console.log(`Listings import progress: ${++listingsCounter}/${listingsBatchCount}`);
          listingTime = new Date();
          console.log('Listings import time: ' + ((listingTime.getTime() - userTime.getTime()) / 1000) + ' seconds');
        }).catch((err) => {
          console.error(err);
        });
      }, Promise.resolve()).then(() => {

        client.close();

        console.log('Listings import complete.')
        console.log('===========================');
        console.log('Database import complete.')
        console.log('Total import time: ' + ((listingTime.getTime() - startTime.getTime()) / 1000) + ' seconds');

      });

    });

  });
}

importData();

module.export = importData;