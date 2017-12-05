const app = require('express')();
const cors = require('cors');

const mongoose = require('mongoose');
const Killmail = require('./api/models/killmail');
const bodyParser = require('body-parser');

const killmails = require('./api/controllers/killmails');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://evemonitor:Manul844@172.104.130.239/killmails', {
  useMongoClient: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.route('/killmails')
  .get(killmails.listAllKillmails);

app.route('/killmails/:killmail_id')
  .get(killmails.readKillmail);

// app.route('/killmails')
//   .get((req, res) => {
//     res.send('asdasda');
//   });

app.listen(4000);
