const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KillmailSchema = new Schema({
  _id: {
    type: Number,
  },
  killmail_id: {
    type: Number,
  },
  killmail_time: {
    type: Date,
  },
  solar_system_id: {
    type: Number,
  },
  war_id: {
    type: Number,
  },
  victim: {
    character_id: Number,
    corporation_id: Number,
    damage_taken: Number,
    items: Array,
    position: {
      x: Number,
      y: Number,
      z: Number,
    },
    ship_type_id: Number,
  },
  attackers: Schema.Types.Mixed,
  zkb: Schema.Types.Mixed,
}, { toJSON: { virtuals: true } });

KillmailSchema.virtual('victim.ship', {
  ref: 'TypeID',
  localField: 'victim.ship_type_id',
  foreignField: '_id',
  justOne: true,
});


module.exports = mongoose.model('Killmail', KillmailSchema);
