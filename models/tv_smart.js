var WebSocketClient = require('websocket').client;
var status_tv = 0;
var volume = 0;
var number;


var cliente = new WebSocketClient();

/*cliente.on('connect', function(connection) {
console.log('WebSocket Client Connected');

connection.on('message', function(message) {
if (message.type === 'utf8') {
console.log("Received: '" + message.utf8Data + "'");
}
});*/

exports.control_tv = function () {
  if (status_tv == 0) {
    status_tv = 1;
    console.log("LIGOU A TV");
    app.sensors.tv_On_Off.digitalWrite(0);
    //sendNumber("ligarTv");
  } else {
    status_tv = 0;
    console.log("DESLIGOU A TV");
    app.sensors.tv_On_Off.digitalWrite(1);
    //sendNumber("desligarTv");
  }
}

exports.increase = function () {
  if (volume < 50) {
    volume++;
    app.sensors.tv_Increase.digitalWrite(1);
    app.sensors.tv_Increase.digitalWrite(0);
    //sendNumber("aumentar");
  }
  console.log("Aumentou volume tv " + volume);
}

exports.decrease = function () {
  if (volume > 0) {
    volume--;
    app.sensors.tv_Decrease.digitalWrite(1);
    app.sensors.tv_Decrease.digitalWrite(0);
    //sendNumber("diminuir");
  }
  console.log("Diminuiu volume tv " + volume);
}

function sendNumber(status) {
  if (connection.connected) {
    connection.sendUTF(status.toString());
  }
}
//});

exports.socket_Televisor = function () {
  socket.on('connect', function (client) {

    socket.emit('tv_connect', {
      'tv_status': status_tv,
      'volume_tv': volume
    });

    client.on('tv_function', function (tv) {
      console.log("Servidor " + tv);

      if (tv == "tv_On_Off") {
        app.televisor_on_off();
      }

      client.broadcast.emit("tv_function", tv);
    });

    client.on('tv_volume', function (tv_volume) {
      console.log("Servidor " + tv_volume);

      if (tv_volume == "increase") {
        app.televisor_increase();
      } else if (tv_volume == "decrease") {
        app.televisor_decrease();
      }

      client.broadcast.emit("tv_volume", tv_volume);
    });
  });
};

//cliente.connect('ws://192.168.1.254:81/');
