const models = require('./models.js');

const controllers = {

  get: (req, res) => {
    
    // let listingId = req.params.listingId;
    // models.get(listingId)
    //   .then((result) => {
    //     res.status(200).send(result);
    //   })
    //   .catch((err) => {
    //     res.status(400).send(err);
    //   });

    let listingId = req.params.listingId;
    let data = {};
    models.getListing(listingId)
      .then((result) => {
        data.listing = result;
        return models.getReservations(listingId);
      })
      .then((result) => {
        data.reservations = result;
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send(err);
      });

  }
};

module.exports = controllers;