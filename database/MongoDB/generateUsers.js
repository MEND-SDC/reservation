const Promise = require('bluebird');
const fsp = Promise.promisifyAll(require("fs"));
const path = require('path');
const seedFolder = path.resolve(__dirname, "./seedFiles/users/");
const faker = require('faker');

const generateUsers = () => {

  return new Promise((resolve, reject) => {

    var startTime = new Date();
    var currTime;

    var id_count = 1;
    var userArr = [];

    const userArrGenerator = () => {
      // for (var i = 0; i < 10000; i++) {
      for (var i = 0; i < 1000000; i++) {
        userArr.push({
          _id: id_count++,
          name: faker.name.findName(),
          email: faker.internet.email(),
          birthday: faker.date.between('1920-01-01', '2000-12-31')
        });
      }
    }
    userArrGenerator();
    fsp.writeFileAsync(seedFolder + "/0.json", JSON.stringify(userArr))
      .then(() => {
        console.log('1/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = [];
        userArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/1.json", JSON.stringify(userArr));
      })
      .then(() => {
        console.log('2/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = [];
        userArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/2.json", JSON.stringify(userArr));
      })
      .then(() => {
        console.log('3/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = [];
        userArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/3.json", JSON.stringify(userArr));
      })
      .then(() => {
        console.log('4/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = [];
        userArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/4.json", JSON.stringify(userArr));
      })
      .then(() => {
        console.log('5/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = [];
        userArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/5.json", JSON.stringify(userArr));
      })
      .then(() => {
        console.log('6/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = [];
        userArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/6.json", JSON.stringify(userArr));
      })
      .then(() => {
        console.log('7/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = [];
        userArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/7.json", JSON.stringify(userArr));
      })
      .then(() => {
        console.log('8/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = [];
        userArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/8.json", JSON.stringify(userArr));
      })
      .then(() => {
        console.log('9/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = [];
        userArrGenerator();
        return fsp.writeFileAsync(seedFolder + "/9.json", JSON.stringify(userArr));
      })
      .then(() => {
        console.log('10/10 users written.');
        currTime = new Date();
        console.log('Time passed: ' + ((currTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
        userArr = null;
        resolve();
      })
      .catch((err) => {
        reject(err);
      });

  });
};

// generateUsers();

module.exports = generateUsers;