const app = require('express')();
const http = require('http').Server(app);
const https = require('https');
const io = require('socket.io')(http);

io.set('origins', 'http://localhost:4210');

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


function getKillmail() {
  https.get('https://redisq.zkillboard.com/listen.php', (res) => {
    let body = '';

    res.on('data', (d) => {
      body += d;
    });
    res.on('end', function() {
      let payload = JSON.parse(body);

      if (payload.package) {
        console.log('Killmail: ', payload.package.killID);

        io.emit('killmail', {
          killID: payload.package.killID,
          killmail: payload.package.killmail,
        });
      }


      getKillmail();
    });
  }).on('error', (e) => {
    console.error(e);
  });
}

getKillmail();
