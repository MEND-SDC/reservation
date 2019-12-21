const generateUsers = require('./generateUsers.js');
const generateListings = require('./generateListings.js');

const generateData = () => {
  var startTime = new Date();
  var userTime, listingTime;

  generateUsers()
    .then(() => {
      console.log('Users generation complete.');
      userTime = new Date();
      console.log('Time for users generation: ' + ((userTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
      return generateListings();
    })
    .then(() => {
      console.log('Listings generation complete.')
      listingTime = new Date();
      console.log('Time for listings generation: ' + ((listingTime.getTime() - userTime.getTime()) / 1000) + ' seconds');
      console.log('Total time for data generation: ' + ((listingTime.getTime() - startTime.getTime()) / 1000) + ' seconds');
    })
    .catch((err) => {
      console.error(err);
    });
};

generateData();

module.export = generateData;