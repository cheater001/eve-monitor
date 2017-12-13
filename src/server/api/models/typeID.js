const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeIDSchema = Schema({
  _id: Number,
  name: Schema.Types.Mixed,
});

module.exports = mongoose.model('TypeID', TypeIDSchema);
