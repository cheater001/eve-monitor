const mongoose = require('mongoose');
const Killmail = mongoose.model('Killmail');

exports.listAllKillmails = function (req, res) {

  const skip = parseInt(req.query.skip) || 0;
  const limit = parseFloat(req.query.limit) || 10;
  const fields = req.query.fields || 'killmail_id';
  const filters = JSON.parse(req.query.filters || {});
  const cached = JSON.parse(req.query.cached);

  let query = Killmail.find(filters)
    .skip(skip)
    .limit(limit)
    .select(fields);

  // if (cached.length) {
  //   query.where('killmail_id').ne(cached);
  // }


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
