const mongoose = require('mongoose');
const Killmail = mongoose.model('Killmail');

exports.listAllKillmails = function (req, res) {
  const skip = req.body.skip || 0;
  const limit = req.body.limit || 10;
  const fields = req.body.fields;
  const filters = req.body.filters || {};
  const cached = req.body.cached;
  const sort = req.body.sort || { killmail_time: -1 };

  let query = Killmail.find(filters)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  if ( fields ) {
    query.select(fields);
  }

  if ( cached ) {
    query.where('killmail_id').nin(cached);
  }

  query
    .populate('victim.ship_type_id')
    .exec((err, data) => {
      if ( err ) {
        res.send(err);
      }

      res.json(data);
    })
    .catch((err) => {
      console.log('listAllKillmails');
      console.log(err);
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
