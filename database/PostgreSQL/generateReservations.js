const moment = require('moment');

const reservationGenerator = (listing_id, userTotal) => {
  
  const numReservations = Math.floor(Math.random() * 20) + 1;
  const numDays = numReservations * 2;
  const days = {};
  // var reservations = [];
  var reservations = '';
  for (let i = 0; i < numDays; i++) {
    let day = Math.ceil(Math.random() * 180);
    while (days[day] === true) {
      day = Math.ceil(Math.random() * 180);
    }
    days[day] = true;
  }
  const reservationDates = Object.keys(days).map((element) => Number(element));
  reservationDates.sort((a, b) => a - b);
  for (let j = 0; j < reservationDates.length; j += 2) {

    // listing_id INTEGER REFERENCES rooms(id),
    // user_id INTEGER REFERENCES users(id),
    // start_date DATE,
    // end_date DATE,
    // adult_count INTEGER,
    // child_count INTEGER,
    // infant_count INTEGER,
    // total_payment MONEY
    // const reservation = [
    //   listing_id,
    //   Math.floor(Math.random() * userTotal) + 1,
    //   moment().add(reservationDates[j], 'days').format('YYYY[-]MM[-]DD'),
    //   moment().add(reservationDates[j + 1], 'days').format('YYYY[-]MM[-]DD'),
    //   Math.floor(Math.random() * 6) + 1,
    //   Math.floor(Math.random() * 5),
    //   Math.floor(Math.random() * 2),
    //   Math.floor(Math.random() * 50) * 20 + 50
    // ];

    const reservation = `${listing_id},${Math.floor(Math.random() * userTotal) + 1},${moment().add(reservationDates[j], 'days').format('YYYY[-]MM[-]DD')},${moment().add(reservationDates[j + 1], 'days').format('YYYY[-]MM[-]DD')},${Math.floor(Math.random() * 6) + 1},${Math.floor(Math.random() * 5)},${Math.floor(Math.random() * 2)},${Math.floor(Math.random() * 50) * 20 + 50}\n`;

    // reservations.push(reservation);
    reservations += reservation;
  }


  return reservations;
}

const generateReservations = function* (batchCount, listingTotal, userTotal) {
  var batchSize = listingTotal / batchCount;
  // let batchBin = [];
  let batchBin = '';
  for (var i = 1; i <= listingTotal; i++) {
    // batchBin.push(reservationGenerator(i, userTotal));
    batchBin += reservationGenerator(i, userTotal);
    if (i % batchSize === 0) {
      yield batchBin;
      // batchBin = [];
      batchBin = '';
    }
  }
};

// generateReservations();

module.exports = generateReservations;