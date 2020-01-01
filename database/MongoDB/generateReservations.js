/* This file randomly generates 1 - 10 reservations up to 90 days from when this script is ran.
It returns an array of objects to be 'bulk created' in the bookings file.
Input: loft_id (int)
Output: bulkReservations (array) */

const moment = require('moment');

module.exports = (max_guests, min_nights, max_nights) => {
  const numReservations = Math.floor(Math.random() * 20) + 1;
  const numDays = numReservations * 2;
  const days = {};
  const reservations = [];
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
    var guestCount = max_guests;
    const reservation = {};
    reservation.user_id = Math.floor(Math.random() * 10000000) + 1;

    reservation.start_date = moment().add(reservationDates[j], 'days').format('YYYY[-]MM[-]DD');
    reservation.end_date = moment().add(reservationDates[j + 1], 'days').format('YYYY[-]MM[-]DD');

    var adultCount = Math.floor(Math.random() * guestCount) + 1;
    reservation.adult_count = adultCount;
    guestCount -= adultCount;

    var childCount = Math.floor(Math.random() * guestCount);
    reservation.child_count = childCount;
    guestCount -= childCount;

    var infantCount = Math.floor(Math.random() * guestCount);
    reservation.infant_count = infantCount;
    guestCount -= infantCount;

    reservation.total_payment = Math.floor(Math.random() * 50) * 20 + 50;

    reservations.push(reservation);
  }
  return reservations;
};