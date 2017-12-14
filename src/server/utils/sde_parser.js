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
    for ( key in data ) {
      let document = data[key];

      document['_id'] = key;

      const typeID = new TypeID(document);

      typeID.save()
        .then(((_id) => {
          return () => {
            console.log(`${_id} Inserted`);
          };
        })(key))
        .catch(e => {
          console.log(`Type was NOT INSERTED to collection.`);
          console.log(e);
        });
    }
  });
});

