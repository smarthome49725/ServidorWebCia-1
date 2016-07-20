var bathroom = 0;
var connection_lamp_all = 0;
var kitchen = 0;
var roomOne = 0;
var roomTwo = 0;
var controlAll_lamp = 0;
var bedroom = 0;

exports.control_lampAll = function(){
  if(connection_lamp_all === 0){
    app.sensors.relay_kitchen.digitalWrite(0);
    app.sensors.relay_bathroom.digitalWrite(0);
    app.sensors.relay_room.digitalWrite(0);
    app.sensors.relay_roomTwo.digitalWrite(0);
    app.sensors.relay_bedroom.digitalWrite(0);
    modifyLamps(1,5);
    console.log("Todas " + controlAll_lamp);
  } else {
    app.sensors.relay_kitchen.digitalWrite(1);
    app.sensors.relay_bathroom.digitalWrite(1);
    app.sensors.relay_room.digitalWrite(1);
    app.sensors.relay_roomTwo.digitalWrite(1);
    app.sensors.relay_bedroom.digitalWrite(1);

    modifyLamps(0,0);
    console.log("Todas " + controlAll_lamp);
  }
};

exports.roomTwo = function(){
  if(roomTwo === 0){
    roomTwo = 1;
    app.sensors.relay_roomTwo.digitalWrite(0);
    console.log("Ligou Relay - Sala Segunda " + roomTwo);
    controlAll_lamp += 1;
    console.log("Todas " + controlAll_lamp);
    statusLamps();
  } else {
    roomTwo = 0;
    console.log("DesLigou Relay - Sala Segunda " + roomTwo);
    app.sensors.relay_roomTwo.digitalWrite(1);
    controlAll_lamp -= 1;
    console.log("Todas " + controlAll_lamp);
    statusLamps();
  }
  return roomTwo;
};

exports.roomOne = function(){
  if(roomOne === 0){
    roomOne = 1;
    console.log("Ligou Relay - Primeira Sala " + roomOne);
    app.sensors.relay_room.digitalWrite(0);
    controlAll_lamp += 1;
    console.log("Todas " + controlAll_lamp);
    statusLamps();
  } else {
    roomOne = 0;
    console.log("DesLigou Relay - Primeira Sala " + roomOne);
    app.sensors.relay_room.digitalWrite(1);
    controlAll_lamp -= 1;
    console.log("Todas " + controlAll_lamp);
    statusLamps();
  }
  return roomOne;
};

exports.bedroom = function(){
  if(bedroom == 0){
    bedroom = 1;
    console.log("Ligou Relay - Quarto " + bedroom);
    app.sensors.relay_bedroom.digitalWrite(0);
    controlAll_lamp += 1;
    console.log("Todas " + controlAll_lamp);
    statusLamps();
  } else {
    bedroom = 0;
    console.log("DesLigou Relay - Quarto " + bedroom);
    app.sensors.relay_bedroom.digitalWrite(1);
    controlAll_lamp -= 1;
    console.log("Todas " + controlAll_lamp);
    statusLamps();
  }
  return bedroom;
};

exports.kitchen = function(){
  if(kitchen == 0){
   kitchen = 1;
   console.log("Ligou Relay - Cozinha " + kitchen);
   app.sensors.relay_kitchen.digitalWrite(0);
   controlAll_lamp += 1;
   console.log("Todas " + controlAll_lamp);
   statusLamps();
 } else {
   kitchen = 0;
   console.log("DesLigou Relay - Cozinha " + kitchen);
   app.sensors.relay_kitchen.digitalWrite(1);
   controlAll_lamp -= 1;
   console.log("Todas " + controlAll_lamp);
   statusLamps();
 }
  return kitchen;
};

exports.bathroom = function(){
    if(bathroom === 0){
      bathroom = 1;
      console.log("Ligou Relay - Banheiro " + bathroom);
      app.sensors.relay_bathroom.digitalWrite(0);
      controlAll_lamp += 1;
      statusLamps();
      console.log("Todas " + controlAll_lamp);
    } else {
      bathroom = 0;
      console.log("DesLigou Relay - Banheiro " + bathroom);
      app.sensors.relay_bathroom.digitalWrite(1);
      controlAll_lamp -= 1;
      console.log("Todas " + controlAll_lamp);
      statusLamps();
    }
  return bathroom;
};

function statusLamps(){
  if(controlAll_lamp === 5){
    connection_lamp_all = 1;
    console.log("Ligou todas as lampadas" + connection_lamp_all);
  }else if(controlAll_lamp < 5){
    connection_lamp_all = 0;
  }
};

function modifyLamps(lamp,all_lamp){
  connection_lamp_all = lamp;
  bathroom = lamp;
  kitchen = lamp;
  roomOne = lamp;
  roomTwo = lamp;
  bedroom = lamp;
  controlAll_lamp = all_lamp;
}

exports.socket_Lamps = function(){
  socket.on('connect', function (client) {

  socket.emit('allLamp',{
    'lampBathroom':bathroom,
    'lampKitchen':kitchen,
    'lampBedroom':bedroom,
    'lampRoomOne':roomOne,
    'lampRoomTwo':roomTwo,
    'lamp_all_conect':controlAll_lamp
  });

  client.on('lamp_All', function(lamps){
    console.log("Servidor " + lamps);

    if(lamps == "lampBathroom"){
      app.relay_bathroomController();
    }else if(lamps == "lampKitchen"){
      app.relay_kitchenController();
    }else if(lamps == "lampBedroom"){
      app.relay_bedroomController();
    }else if (lamps == "lampRoomOne") {
      app.relay_roomController();
    }else if (lamps == "lampRoomTwo") {
      app.relay_roomTwoController();
    }else if(lamps == "lamp_All_Home"){
      app.relay_connect_allController();
    }

    client.broadcast.emit("lamp_All", lamps);
   });
 });
};
