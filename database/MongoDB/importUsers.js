const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = require('path');

const seedFilesPath = path.resolve(__dirname, "./seedFiles")
const url = 'mongodb://localhost:27017/';

const importUsers = () => {

  return new Promise((resolve, reject) => {

    MongoClient.connect(url, function (err, client) {
      assert.equal(null, err);

      var startTime = new Date();
      var currTime;

      exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/0.json --jsonArray`)
        .then(() => {
          console.log('1/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/1.json --jsonArray`)
        })
        .then(() => {
          console.log('2/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/2.json --jsonArray`)
        })
        .then(() => {
          console.log('3/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/3.json --jsonArray`)
        })
        .then(() => {
          console.log('4/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/4.json --jsonArray`)
        })
        .then(() => {
          console.log('5/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/5.json --jsonArray`)
        })
        .then(() => {
          console.log('6/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/6.json --jsonArray`)
        })
        .then(() => {
          console.log('7/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/7.json --jsonArray`)
        })
        .then(() => {
          console.log('8/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/8.json --jsonArray`)
        })
        .then(() => {
          console.log('9/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          return exec(`mongoimport -h localhost -d reservations -c users --file ${seedFilesPath}/users/9.json --jsonArray`)
        })
        .then(() => {
          console.log('10/10 users inserted.');
          currTime = new Date();
          console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
          console.log('User insertion into MongoDB complete.');
          client.close();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });

    });
  });
}

// importUsers();

module.exports = importUsers;