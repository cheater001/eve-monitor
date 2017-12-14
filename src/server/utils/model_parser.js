const yaml = require('node-yaml');

yaml.read('../../assets/sde/typeIDs.yaml', null, (err, data) => {
  let count = 0;
  const keys = [];
  const examples = [];
  const total = Object.keys(data).length;

  for ( key in data ) {
    let document = data[key];

    Object.keys(document).forEach(k => {
      if (keys.indexOf(k) === -1) {
        keys.push(k);
        examples.push({
          key: k,
          example: document[k],
        });
      }
    });

    console.log(`${++count} of ${total}`);
  }

  console.log(keys);
  console.log(examples);
});
