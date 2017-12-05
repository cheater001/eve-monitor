const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KillmailSchema = new Schema({
  killmail_id: {
    type: Number,
  },
  killmail_time: {
    type: Date,
  },
  solar_system_id: {
    type: Number,
  },
});

module.exports = mongoose.model('Killmail', KillmailSchema);
