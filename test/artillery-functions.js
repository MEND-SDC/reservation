'use strict';

module.exports = {
  generateRandomListingId: (userContext, events, done) => {
    const listingId = Math.floor(Math.random() * 10000000) + 1;
    userContext.vars.listingId = listingId;
    return done();
  }
};