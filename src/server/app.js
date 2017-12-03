const app = require('express')();
const http = require('http').Server(app);
const https = require('https');
const io = require('socket.io')(http);

const MongoClient = require('mongodb').MongoClient;

let db;

io.set('origins', 'http://localhost:4210');
io.on('connection', () => console.log('a user connected'));

MongoClient.connect('mongodb://evemonitor:Manul844@172.104.130.239/killmails', (err, database) => {
  if ( err ) return console.log(err);

  db = database;

  http.listen(3000, () => console.log('Listening on *:3000'));

  getKillmail();
});

function getKillmail() {
  https.get('https://redisq.zkillboard.com/listen.php', (res) => {
    let body = '';

    res.on('data', (d) => {
      body += d;
    });
    res.on('end', function () {
      let payload = JSON.parse(body);

      if ( payload.package ) {
        io.emit('killmail', {
          killID: payload.package.killID,
          killmail: payload.package.killmail,
        });

        db.collection('killmails').insertOne(payload.package.killmail, (err, result) => {
          if (err) return console.log(err);

          console.log(`Killmail ${payload.package.killID} inserted to collection.`);
        });
      }


      getKillmail();
    });
  }).on('error', (e) => {
    console.error(e);
  });
}
