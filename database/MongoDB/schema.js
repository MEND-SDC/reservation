// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/mend_reservations');

// let roomsSchema = mongoose.Schema({
//   // TODO: your schema here!
//   _id: Number,
//   name: String,
//   price_base: Number,
//   price_weekend: Number,
//   price_holiday: Number,
//   price_guest: Number,
//   price_cleaning: Number,
//   price_service: Number,
//   max_guests: Number,
//   min_nights: Number,
//   max_nights: Number,
//   rating_average: Number,
//   address: String,
//   country: String,
//   reservations: [],
//   /*
//     user_id Number,
//     start_date Date,
//     end_date Date,
//     adult_count Number,
//     child_cound Number,
//     infant_count Number,
//     total_payment Number,
//   */
// });

// let reviewsSchema = mongoose.Schema({
//   _id: Number,
//   room_id: Number,
//   user_id: Number,
//   rating: Number,
//   comment: String
// });

// let usersSchema = mongoose.Schema({
//   _id: Number,
//   name: String,
//   email: String,
//   birthday: Date
// });

// // let users = mongoose.model('User', usersSchema);

// referenceStr.localeCompare(compareString[, locales[, options]])
// str.charCodeAt(index)