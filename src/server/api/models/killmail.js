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
  victim: Schema.Types.Mixed,
  attackers: Schema.Types.Mixed,
  zkb: Schema.Types.Mixed,
});


module.exports = mongoose.model('Killmail', KillmailSchema);
