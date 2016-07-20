var express       = require('express.io'),
    Cylon         = require('cylon'),
    temper        = require('./models/temperature.js'),
    ExeStepper    = require('./models/stepper.js'),
    televisor     = require('./models/tv_smart.js'),
    ar            = require('./models/airconditioning.js'),
    control_light = require('./models/lamps.js');

app = express();
socket = require('socket.io').listen(app.listen(8245));

app.sensorsReady = false;
app.sensors = {};

app.use(express.static(__dirname + '/public'));
app.http().io();

Cylon.robot({
  connections: {
    galileo: {
      adaptor: 'intel-iot'
    }
  },

  devices: {
    temp_bathroom: {driver: 'analogSensor',pin: 0},
    temp_kitchen: {driver: 'analogSensor', pin: 1},
    temp_bedroom: {driver: 'analogSensor', pin: 2},
    temp_room: {driver: 'analogSensor', pin: 3},
    relay_bathroom: {driver: 'direct-pin',pin: 6},
    relay_kitchen: {driver: 'direct-pin',pin: 7},
    relay_room: {driver: 'direct-pin',pin: 8},
    relay_roomTwo: {driver: 'direct-pin',pin: 9},
    relay_bedroom: {driver: 'direct-pin',pin: 10},
    active_ar: {driver: 'direct-pin',pin: 5},
    tv_Increase: {driver: 'direct-pin', pin: 4},
    tv_Decrease: {driver: 'direct-pin', pin: 11},
    tv_On_Off: {driver: 'direct-pin', pin: 12}
  },

  work: function (my) {
   app.sensorsReady = true;
   app.sensors = {
   temp_bathroom: my.temp_bathroom,
   temp_kitchen: my.temp_kitchen,
   temp_bedroom: my.temp_bedroom,
   temp_room: my.temp_room,
   relay_bathroom: my.relay_bathroom,
   relay_kitchen: my.relay_kitchen,
   relay_room: my.relay_room,
   relay_roomTwo: my.relay_roomTwo,
   relay_bedroom: my.relay_bedroom,
   active_ar: my.active_ar,
   tv_Increase: my.tv_Increase,
   tv_Decrease: my.tv_Decrease,
   tv_On_Off: my.tv_On_Off
  };
    every((4).second(), function () {
    app.tempBroadcast();
    });
  }
}).start();

app.tempBroadcast = function () {
  temper.temperature();
},

app.relay_connect_allController = function () {
  control_light.control_lampAll();
},

app.relay_bathroomController = function () {
  control_light.bathroom();
},

app.relay_kitchenController = function () {
  control_light.kitchen();
},

app.relay_bedroomController = function () {
  control_light.bedroom();
},

app.relay_roomController = function () {
  control_light.roomOne();
},

app.relay_roomTwoController = function () {
  control_light.roomTwo();
},

app.control_curtain = function () {
  ExeStepper.controlMotor();
};

app.televisor_on_off = function () {
  televisor.control_tv();
};

app.televisor_increase = function () {
  televisor.increase();
};

app.televisor_decrease = function () {
  televisor.decrease();
};

app.ar_on_off = function () {
  ar.control_ar();
};

app.ar_increase = function () {
  ar.increase();
};

app.ar_decrease = function () {
  ar.decrease();
};

control_light.socket_Lamps();

ExeStepper.socket_curtain();

televisor.socket_Televisor();

ar.socket_AR();

console.log('Smart Home - C.I.A - 8245');
