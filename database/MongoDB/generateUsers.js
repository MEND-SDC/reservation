const faker = require('faker');

const generateUser = (user_id) => {
  return {
    _id: user_id,
    name: faker.name.findName(),
    email: faker.internet.email(),
    birthday: faker.date.between('1920-01-01', '2000-12-31')
  };
}

const generateUsers = function* (batchSize, totalSize) {
  let batchBin = [];
  for (var i = 1; i <= totalSize; i++) {
    batchBin.push(generateUser(i));
    if (i % batchSize === 0) {
      yield batchBin;
      batchBin = [];
    }
  }
};

// generateUsers();

module.exports = generateUsers;