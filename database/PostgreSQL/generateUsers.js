const faker = require('faker');
const moment = require('moment');

const generateUser = (user_id) => {
  // id SERIAL PRIMARY KEY,
  // name VARCHAR(255),
  // email VARCHAR(255),
  // birthday DATE
  // return [
  //   user_id,
  //   faker.name.findName(),
  //   faker.internet.email(),
  //   faker.date.between('1920-01-01', '2000-12-31')
  // ];

  return `${user_id},${faker.name.findName()},${faker.internet.email()},${moment(faker.date.between('1920-01-01', '2000-12-31')).format("YYYY-MM-DD")}\n`;
  // return `${faker.name.findName()},${faker.internet.email()},${moment(faker.date.between('1920-01-01', '2000-12-31')).format("YYYY-MM-DD")}\n`;
}

const generateUsers = function* (batchCount, totalSize) {
  var batchSize = totalSize / batchCount;
  // let batchBin = [];
  let batchBin = '';
  for (var i = 1; i <= totalSize; i++) {
    // batchBin.push(generateUser(i));
    batchBin += generateUser(i);
    if (i % batchSize === 0) {
      yield batchBin;
      // batchBin = [];
      batchBin = '';
    }
  }
};

// generateUsers();

module.exports = generateUsers;