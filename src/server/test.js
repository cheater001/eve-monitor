const mongoose = require('mongoose');
require('./api/models/killmail');
const Killmail = mongoose.model('Killmail');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://evemonitor:Manul844@172.104.130.239/killmails', {
  useMongoClient: true,
});

// Killmail.find({killmail_id: 66354935}).exec((err, data) => {
//   console.log(data);
// });


const killmail = new Killmail({
  killmail_id: 11,
  killmail_time: new Date(),
  solar_system_id: 22
});

killmail.save();
