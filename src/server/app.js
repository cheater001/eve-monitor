const app = require('express')();
const http = require('http').Server(app);
const https = require('https');
const io = require('socket.io')(http);

const mongoose = require('mongoose');
require('./api/models/killmail');
const Killmail = mongoose.model('Killmail');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://evemonitor:Manul844@172.104.130.239/killmails', {
  useMongoClient: true,
});

io.set('origins', 'http://localhost:4210');
io.on('connection', () => console.log('a user connected'));

http.listen(3000, function(){
  console.log('Listening on *:3000');
});

(function getKillmail() {
  https.get('https://redisq.zkillboard.com/listen.php', (res) => {
    let body = '';

    res.on('data', (d) => {
      body += d;
    });
    res.on('end', function () {
      let payload = JSON.parse(body);

      payload.killmail_time = new Date(payload.killmail_time);

      if ( payload.package ) {
        io.emit('killmail', {
          killID: payload.package.killID,
          killmail: payload.package.killmail,
        });

        const killmail = new Killmail(payload.package.killmail);

        killmail.save()
          .then(() => {
            console.log(`Killmail ${payload.package.killID} INSERTED to collection.`);
          })
          .catch(e => {
            console.log(`Killmail ${payload.package.killID} was NOT INSERTED to collection.`);
          });
      }


      getKillmail();
    });
  }).on('error', (e) => {
    console.error(e);
  });
})();
