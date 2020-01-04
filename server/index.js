const newrelic = require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var compression = require('compression');
const path = require('path');

// const controllers = require('./controllers.js');
const models = require('./models.js');

const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}

app.use(compression({ filter: shouldCompress }));

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/:listingId', express.static(path.join(__dirname, '../client/dist')));

app.get('/api/reservations/:listingId', (req, res) => {
  // console.log(req);
  // controllers.get(req, res);
  models.getFromModel(req, res);
});

// app.get('/dates/:id', (req, res) => {
//   controllers.getDates(req, res);
// });

app.listen(port, () => console.log(`Listening on port: ${port}`));