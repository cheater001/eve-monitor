const mongoose = require('mongoose');
const Killmail = mongoose.model('Killmail');

exports.listAllKillmails = function (req, res) {
  const skip = req.body.skip || 0;
  const limit = req.body.limit || 10;
  const fields = req.body.fields;
  const filters = req.body.filters || {};
  const cached = req.body.cached;

  let query = Killmail.find(filters)
    .skip(skip)
    .limit(limit);

  if (fields) {
    query.select(fields);
  }

  if (cached) {
    query.where('killmail_id').nin(cached);
  }

  query.exec((err, data) => {
    if ( err ) {
      res.send(err);
    }

    res.json(data);
  })
};

exports.readKillmail = function (req, res) {
  const id = req.params.killmail_id;
  const fields = req.query.fields || 'killmail_id killmail_time solar_system_id';

  let query = Killmail.findOne({ killmail_id: id });

  query
    .select(fields)
    .exec((err, task) => {
      if ( err )
        res.send(err);
      res.json(task);
    });
};
