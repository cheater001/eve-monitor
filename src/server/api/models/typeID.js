const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeIDSchema = Schema({
  _id: {
    type: Number,
  },
  name: {
    type: String,
    set: v => v.en,
  },
  description: {
    type: String,
    set: v => v.en,
  },
  groupID: Number,
  mass: Number,
  portionSize: Number,
  published: Boolean,
  volume: Number,
  radius: Number,
  graphicID: Number,
  soundID: Number,
  iconID: Number,
  raceID: Number,
  sofFactionName: String,
  basePrice: Number,
  marketGroupID: Number,
  capacity: Number,
  factionID: Number,
  sofMaterialSetID: Number,
  //masteries
  //traits
}, { toJSON: { virtuals: true } });

TypeIDSchema.virtual('images').get(function () {
  return {
    xl: `https://image.eveonline.com/Render/${this._id}_512.png`,
    lg: `https://image.eveonline.com/Render/${this._id}_256.png`,
    md: `https://image.eveonline.com/Render/${this._id}_128.png`,
    sm: `https://image.eveonline.com/Render/${this._id}_64.png`,
    xs: `https://image.eveonline.com/Render/${this._id}_32.png`,
  };
});

module.exports = mongoose.model('TypeID', TypeIDSchema);


//https://image.eveonline.com/Type/14264_64.png
