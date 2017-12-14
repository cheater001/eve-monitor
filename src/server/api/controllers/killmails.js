const mongoose = require('mongoose');
const Killmail = mongoose.model('Killmail');

exports.listAllKillmailsIds = function(req, res) {
  const skip = req.body.skip || 0;
  const limit = req.body.limit || 10;
  const filters = req.body.filters || {};
  const sort = req.body.sort || { killmail_time: -1 };

  let query = Killmail.find(filters)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .select('_id');

  query
    .exec((err, data) => {
      if ( err ) {
        res.send(err);
      }

      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    })
};

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
    query.where('_id').nin(cached);
  }

  query
    .populate({path: 'victim.ship', select: '_id name groupID graphicID factionID'})
    .exec((err, data) => {
      if ( err ) {
        res.send(err);
      }

      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    })
};

exports.readKillmail = function (req, res) {
  const id = req.params._id;
  const fields = req.query.fields || '_id';

  let query = Killmail.findOne({ _id: id });

  query
    .select(fields)
    .exec((err, task) => {
      if ( err )
        res.send(err);
      res.json(task);
    });
};
