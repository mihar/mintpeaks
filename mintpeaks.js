var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var net = require('net');
var debug = require('debug')('mintpeaks:server');

// Tessel TCP server settings.
var TESSEL_SERVER_HOST = '0.0.0.0';
var TESSEL_SERVER_PORT = 10231;
var TESSEL_CONNECTED = false;
var TESSEL_HEARTBEAT = null;

// HTTP server settings.
var HTTP_SERVER_PORT = 3000;

// Socket.io connection logging.
io.on('connection', function(sckt) {
  debug('Browser connected');

   sckt.on('disconnect', function() {
    debug('Browser disconnected');
  });
});

// Start up HTTP server.
http.listen(HTTP_SERVER_PORT, function() {
  debug('HTTP server listening on *:' + HTTP_SERVER_PORT);
});

// Callback runs for each created connection.
net.createServer(function(sckt) {
  // A connection was initiated.
  debug('Tessel connected', sckt.remoteAddress, sckt.remotePort);
  TESSEL_CONNECTED = true;

  sckt.on('data', function(data) {
    data = data.toString('utf8');

    try {
      var parsed_data = JSON.parse(data);
      debug('Received data from Tessel', parsed_data);

      // Emit received data through Socket.io.
      io.emit('received_data', parsed_data);

      // Reset the Tessel heartbeat timer.
      clearTimeout(TESSEL_HEARTBEAT);
      TESSEL_HEARTBEAT = setTimeout(function() { TESSEL_CONNECTED = false; }, 10000);
    } catch (e) {
      debug('ERROR: Received non JSON data from Tessel', data);
    }
  });

  // Connection closed handler.
  sckt.on('close', function() {
    debug('Tessel disconnected');
    TESSEL_CONNECTED = false;
  });
}).listen(TESSEL_SERVER_PORT, TESSEL_SERVER_HOST);

debug('Tessel server listening on ' + TESSEL_SERVER_HOST + ':' + TESSEL_SERVER_PORT);

// Send over heartbeat.
setInterval(function() {
  io.emit('heartbeat', { mintpeaks: true, tessel: TESSEL_CONNECTED });
}, 2500);
