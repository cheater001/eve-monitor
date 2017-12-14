const app = require('express')();
const cors = require('cors');

const mongoose = require('mongoose');
const Killmail = require('./api/models/killmail');
const TypeID = require('./api/models/typeID');
const bodyParser = require('body-parser');

const killmails = require('./api/controllers/killmails');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://evemonitor:Manul844@172.104.130.239/killmails', {
  useMongoClient: true,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.route('/killmails-ids')
  .post(killmails.listAllKillmailsIds);

app.route('/killmails')
  .post(killmails.listAllKillmails);

app.route('/killmails/:_id')
  .get(killmails.readKillmail);

app.listen(4000);
