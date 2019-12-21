const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const seedFilesPath = path.resolve(__dirname, "./seedFiles")
const url = 'mongodb://localhost:27017/';

const importListings = () => {

  return new Promise((resolve, reject) => {

    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);

      var startTime = new Date();
      var currTime;

      exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/0.json --jsonArray`)
        .then(() => {
          console.log('1/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/1.json --jsonArray`)
        })
        .then(() => {
          console.log('2/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/2.json --jsonArray`)
        })
        .then(() => {
          console.log('3/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/3.json --jsonArray`)
        })
        .then(() => {
          console.log('4/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/4.json --jsonArray`)
        })
        .then(() => {
          console.log('5/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/5.json --jsonArray`)
        })
        .then(() => {
          console.log('6/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/6.json --jsonArray`)
        })
        .then(() => {
          console.log('7/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/7.json --jsonArray`)
        })
        .then(() => {
          console.log('8/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/8.json --jsonArray`)
        })
        .then(() => {
          console.log('9/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c listings --file ${seedFilesPath}/listings/9.json --jsonArray`)
        })
        .then(() => {
          console.log('10/10 listings inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          console.log('One listings insertion into MongoDB complete.');
          client.close();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });

    });
  });
}

// importListings();

module.exports = importListings;