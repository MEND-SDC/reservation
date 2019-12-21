const importUsers = require('./importUsers.js');
const importListings = require('./importListings.js');

const importData = () => {

  var startTime = new Date();
  var userTime, listingTime;

  importUsers()
    .then(() => {
      userTime = new Date();
      console.log('Time for users import: ' + ((userTime.getTime() - startTime.getTime()) / 1000) + ' seconds');    
      return importListings(); 
    })
    .then(() => {
      listingTime = new Date();
      console.log('Time for listings import: ' + ((listingTime.getTime() - userTime.getTime()) / 1000) + ' seconds');
      console.log('Total import time: ' + ((listingTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
    })
    .catch((err) => {
      console.error(err);
    });

}

importData();

module.export = importData;