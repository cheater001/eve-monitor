const MongoClient = require('mongodb').MongoClient;

module.exports = function(handler) {
  return MongoClient.connect('mongodb://evemonitor:Manul844@172.104.130.239/killmails', (err, database) => {
    if ( err ) return console.log(err);


    handler(err, database);
  });
};
