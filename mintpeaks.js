var net = require('net');

var HOST = '0.0.0.0';
var PORT = 10231;

// Callback runs for each created connection.
net.createServer(function(sckt) {
  // A connection was initiated.
  console.log('Connection', sckt.remoteAddress, sckt.remotePort);

  sckt.on('data', function(data) {
    data = data.toString('utf8');

    try {
      var parsed_data = JSON.parse(data);
      console.log('Received data', parsed_data);

    } catch (e) {
      console.log('ERROR: Received non JSON data', data);
    }
  });

  // Connection closed handler.
  sckt.on('close', function() {
    console.log('Disconnected', sckt.remoteAddress, sckt.remotePort);
  });
}).listen(PORT, HOST);

console.log('Server listening on ' + HOST + ':' + PORT);
