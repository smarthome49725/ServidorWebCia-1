var WebSocketClient = require('websocket').client;
var status_ar = 0;
var volume = 17;
var number;


var cliente = new WebSocketClient();

/*cliente.on('connect', function(connection) {
console.log('WebSocket Client Connected');

connection.on('message', function(message) {
if (message.type === 'utf8') {
console.log("Received: '" + message.utf8Data + "'");
}
});
*/
exports.control_ar = function () {
  if (status_ar == 0) {
    status_ar = 1;
    console.log("LIGOU O AR");
    app.sensors.active_ar.digitalWrite(1);
    //sendNumber("ligarAr");
  } else {
    status_ar = 0;
    console.log("DESLIGOU O AR");
    app.sensors.active_ar.digitalWrite(0);
    //sendNumber("desligarAr");
  }
}

exports.increase = function () {
  if (volume < 26) {
    volume++;
    app.sensors.ar_Volume.digitalWrite(1);
    app.sensors.ar_Volume.digitalWrite(0);
    //sendNumber("aumentar");
  }
  console.log("Aumentou volume ar " + volume);
}

exports.decrease = function () {
  if (volume > 17) {
    volume--;
    app.sensors.ar_Volume.digitalWrite(1);
    app.sensors.ar_Volume.digitalWrite(0);
    //sendNumber("diminuir");
  }
  console.log("Diminuiu volume ar " + volume);
}

function sendNumber(status) {
  if (connection.connected) {
    connection.sendUTF(status.toString());
  }
}
//});

exports.socket_AR = function () {
  socket.on('connect', function (client) {

    socket.emit('ar_connect', {
      'ar_status': status_ar,
      'volume_ar': volume
    });

    client.on('ar_function', function (ar) {
      console.log("Servidor " + ar);

      if (ar == "ar_On_Off") {
        app.ar_on_off();
      }

      client.broadcast.emit("ar_function", ar);
    });

    client.on('ar_volume', function (ar_volume) {
      console.log("Servidor " + ar_volume);

      if (ar_volume == "increase") {
        app.ar_increase();
      } else if (ar_volume == "decrease") {
        app.ar_decrease();
      }

       client.broadcast.emit("ar_volume", ar_volume);
    });
  });
};

//cliente.connect('ws://192.168.1.254:81/');
