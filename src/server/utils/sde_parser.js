const yaml = require('node-yaml');

const mongoose = require('mongoose');
require('../api/models/typeID');

const TypeID = mongoose.model('TypeID');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://evemonitor:Manul844@172.104.130.239/killmails', {
  useMongoClient: true,
});

mongoose.connection.on('connected', function () {
  // typeIDs.yaml
  yaml.read('../../assets/sde/typeIDs.yaml', null, (err, data) => {
    let count = 0;
    const total = Object.keys(data).length;

    for ( key in data ) {
      let document = data[key];

      document['_id'] = key;

      const typeID = new TypeID(document);

      typeID.save()
        .then(((_id, _count) => {
          return () => {
            console.log(`${_id} Inserted. ${_count} of ${total}`);
          };
        })(key, ++count))
        .catch(e => {
          console.log(`Type was NOT INSERTED to collection.`);
          console.log(e);
        });
    }
  });
});

