//variaveis globais
var bathroom = 0;
var bedroom = 0;
var kitchen = 0;
var roomOne = 0;
var roomTwo = 0;
var valorCheck = 0;
var volume = 0;
var volume_ar = 0;
var connection_lamp_all = 0;
var statusCurtain = 0;
var tv = 0;
var ar = 17;
var socket = io.connect();

socket.on('connect', function(data) {
  console.log("Conectado");
  socket.on('allLamp',function(data){
    if(data.lamp_all_conect == 5){
      modifyLamps(1, 5);
      statusLampOn("lampbathroom");
      statusLampOn("lampkitchen");
      statusLampOn("lampbedroom");
      statusLampOn("lamp2Sala");
      statusLampOn("lamp1Sala");
    }else if(data.lamp_all_conect != 0){
      connection_lamp_all = data.lamp_all_conect;
      data.lampBathroom == 0 ? statusLampOff("lampbathroom") : statusLampOn("lampbathroom");
      bathroom = data.lampBathroom;
      data.lampKitchen == 0 ? statusLampOff("lampkitchen") : statusLampOn("lampkitchen");
      kitchen = data.lampKitchen;
      data.lampBedroom == 0 ? statusLampOff("lampbedroom") : statusLampOn("lampbedroom");
      bedroom = data.lampBedroom;
      data.lampRoomOne == 0 ? statusLampOff("lamp1Sala") : statusLampOn("lamp1Sala");
      roomOne = data.lampRoomOne;
      data.lampRoomTwo == 0 ? statusLampOff("lamp2Sala") : statusLampOn("lamp2Sala");
      roomTwo = data.lampRoomTwo;   
    }
    status();
 });
 socket.on('curtain_channel',function(data){
    data.sts_curtain == 0 ? document.getElementById("curtain_img").src = "img/cortina-fechada.png" : document.getElementById("curtain_img").src = "img/cortina-aberta.png";
    data.sts_curtain == 0 ? document.getElementById("status_curtain").innerHTML = "Cortina Fechada": document.getElementById("status_curtain").innerHTML = "Cortina Aberta";
    statusCurtain = data.sts_curtain;
    if(data.temp_motor  == 1){
      block_device("curtain_img",15000);
    }
  });

  socket.on('tv_connect',function(data){
    tv = data.tv_status;
    volume = data.volume_tv;
    data.tv_status == 0 ? document.getElementById("tv_img").src = "img/tvciaOff.png" : document.getElementById("tv_img").src = "img/tvciaOn.png";
    data.tv_status == 0 ? document.getElementById('collapse_tv').style.display = "none" : document.getElementById('collapse_tv').style.display = "block";
    data.tv_status == 0 ? document.getElementById('sts_tv').innerHTML = "Desligada" : document.getElementById('sts_tv').innerHTML = "Ligada";
    document.getElementById("volume_tv").innerHTML = volume;
  });

  socket.on('ar_connect',function(data){
    ar = data.ar_status;
    volume_ar = data.volume_ar;
    data.ar_status == 0 ? document.getElementById("ar_img").src = "img/ar_off.png" : document.getElementById("ar_img").src = "img/ar_on.png";
    data.ar_status == 0 ? document.getElementById('collapse_ar').style.display = "none" : document.getElementById('collapse_ar').style.display = "block";
    document.getElementById("volume_ar").innerHTML = volume_ar;
  });
  socket.on('disconnect', function(){
    location.reload();
  });
});

  socket.on('lamp_All', function(lamps) {
   if (lamps == "lampBathroom"){
    acenderLampBathroom();
   }else if (lamps == "lampKitchen"){
    acenderLampkitchen();
   }else if (lamps == "lampBedroom"){
    acenderLampbedroom();
   }else if (lamps == "lampRoomOne"){
    acenderLamproomOne();
   }else if (lamps == "lampRoomTwo"){
    acenderLamproomTwo();
   }else if(lamps == "lamp_All_Home"){
    controlAllLamps();
   }
  });

  socket.on('tv_function',function(tv_data){
    if(tv_data == "tv_On_Off"){
      activeTvCia();
    }
  });

  socket.on('tv_volume',function(tv_volume){
    if(tv_volume == "increase"){
      Increase();
    }else if(tv_volume == "decrease"){
      decrease();
    }
  });

  socket.on('ar_function',function(ar_data){
    if(ar_data == "ar_On_Off"){
      activeArCia();
    }
  });

  socket.on('ar_volume',function(ar_volume){
    if(ar_volume == "increase"){
      Increase_ar();
    }else if(ar_volume == "decrease"){
      decrease_ar();
    }
  });

  socket.on('curtain_func',function(curtain_data){
    if(curtain_data == "control_Curtain"){
      activeCurtain();
    }
  });

//FUNÇAO LAMPADA bathroom
function acenderLampBathroom() {
  if (bathroom == 0) {
    bathroom = 1;
    connection_lamp_all += 1;
    statusLampOn("lampbathroom"); 
  } else {
    bathroom = 0;
    statusLampOff("lampbathroom");
    connection_lamp_all -= 1;
  }
  block("lampbathroom");
  block("cmn-toggle-2");
  status();
}

function sendLampBathroom(){
  socket.emit('lamp_All', "lampBathroom");
}

// FUNÇAO DA LAMPADA DA kitchen
function acenderLampkitchen() {
  if (kitchen == 0) {
    kitchen = 1;
    statusLampOn("lampkitchen");
    connection_lamp_all += 1;
  } else {
    kitchen = 0;
    statusLampOff("lampkitchen");
    connection_lamp_all -= 1;
  }
  block("lampkitchen");
  block("cmn-toggle-2");
  status();
}

function sendLampKitchen(){
  socket.emit('lamp_All', "lampKitchen");
}

// FUNÇAO DA LAMPADA DO bedroom
function acenderLampbedroom() {
  if (bedroom == 0) {
    bedroom = 1;
    statusLampOn("lampbedroom");
    connection_lamp_all += 1;
  } else {
    bedroom = 0;
    statusLampOff("lampbedroom");
    connection_lamp_all -= 1;
  }
  block("lampbedroom");
  block("cmn-toggle-2");
  status();
}

function sendLampBedroom(){
  socket.emit('lamp_All', "lampBedroom");
}

// FUNÇAO DA LAMPADA 1 DA SALA
function acenderLamproomOne() {
  if (roomOne == 0) {
    roomOne = 1;
    statusLampOn("lamp1Sala");
    connection_lamp_all += 1;
  } else {
    roomOne = 0;
    statusLampOff("lamp1Sala");
    connection_lamp_all -= 1;
  }
  block("lamp1Sala");
  block("cmn-toggle-2");
  status();
}

function sendLampRoomOne(){
  socket.emit('lamp_All', "lampRoomOne");
}

//FUNÇAO DA LAMPADA 2 DA SALA
function acenderLamproomTwo() {
  if (roomTwo == 0) {
    roomTwo = 1;
    statusLampOn("lamp2Sala");
    connection_lamp_all += 1;
  } else {
    roomTwo = 0;
    statusLampOff("lamp2Sala");
    connection_lamp_all -= 1;
  }
  block("lamp2Sala");
  block("cmn-toggle-2");
  status();
}

function sendLampRoomTwo(){
  socket.emit('lamp_All', "lampRoomTwo");
}

function status() {
  if (connection_lamp_all == 5) {
    document.getElementById("cmn-toggle-2").checked = true;
    valorCheck = 1;
  } else if (connection_lamp_all < 5) {
    var checkStatus = document.getElementById("cmn-toggle-2").checked;
    if (checkStatus == true) {
      valorCheck = 0;
      document.getElementById("cmn-toggle-2").checked = false;
    }
  }
}

//FUNÇAO DE TODAS AS LAMPADAS
function controlAllLamps() {
  if (valorCheck == 0) {
    statusLampOn("lampbathroom");
    statusLampOn("lampkitchen");
    statusLampOn("lampbedroom");
    statusLampOn("lamp2Sala");
    statusLampOn("lamp1Sala");
    modifyLamps(1,5);
  }else {
    statusLampOff("lampbathroom");
    statusLampOff("lampkitchen");
    statusLampOff("lampbedroom");
    statusLampOff("lamp2Sala");
    statusLampOff("lamp1Sala");
    modifyLamps(0,0);
  }
  block("cmn-toggle-2");
  block_all();
  status();
}

function sendLamp_All(){
  socket.emit('lamp_All',"lamp_All_Home");
}

function modifyLamps(un_lamp,un_all_lamp){
  bathroom = un_lamp;
  kitchen = un_lamp;
  bedroom = un_lamp;
  roomOne = un_lamp;
  roomTwo = un_lamp;
  valorCheck = un_lamp;
  connection_lamp_all = un_all_lamp;
}

function statusLampOff(idLampOffimg){
  document.getElementById(idLampOffimg).src = "img/leddesligada.png";
}

function statusLampOn(idLampOnimg) {
  document.getElementById(idLampOnimg).src = "img/ledligada.png";
}

//FUNCAO CORTINA
function activeCurtain() {
  var nameStatus = "";
  if (statusCurtain == 0) {
    document.getElementById("curtain_img").src = "img/cortina-aberta.png";
    statusCurtain = 1;
    document.getElementById("status_curtain").innerHTML = "Cortina Abrindo";
    nameStatus = "Cortina Aberta";
  } else {
    document.getElementById("curtain_img").src = "img/cortina-fechada.png";
    statusCurtain = 0;
    document.getElementById("status_curtain").innerHTML = "Cortina Fechando";
    nameStatus = "Cortina Fechada";
  }
    setTimeout(function(){ 
    document.getElementById("status_curtain").innerHTML = nameStatus;
  }, 20000);
  block_device("curtain_img",20000);
}  

function sendCurtain(){
  socket.emit('curtain_func',"control_Curtain");
}

//tv
function activeTvCia() {
  btntvimg = document.getElementById('tv_img');
  if (tv === 0) {
    tv = 1;
    btntvimg.src = "img/tvciaOn.png";
    document.getElementById('collapse_tv').style.display = "block";
    document.getElementById('sts_tv').innerHTML = "Ligada";
 } else {
    tv = 0;
    btntvimg.src = "img/tvciaOff.png";
    document.getElementById('collapse_tv').style.display = "none";
    document.getElementById('sts_tv').innerHTML = "Desligada";
  }
  block_device("tv_img",3000);
}

function sendTvHome(){
  socket.emit('tv_function', "tv_On_Off");
}

function Increase(){
  if(volume < 50){
    volume++;
    document.getElementById("volume_tv").innerHTML = volume;
  }
}

function decrease(){
  if(volume > 0){
    volume--;
    document.getElementById("volume_tv").innerHTML = volume;
  }
}

function sendVolume_Increase(){
  console.log("envia Aumento");
  socket.emit('tv_volume', "increase");
}

function sendVolume_Decrease(){
  console.log("envia diminui");
  socket.emit('tv_volume', "decrease");
}

//AR
function activeArCia() {
  btnArimg = document.getElementById('ar_img');
  if (ar === 0) {
    ar = 1;
    btnArimg.src = "img/ar_on.png";
    document.getElementById('collapse_ar').style.display = "block";
 } else {
    ar = 0;
    btnArimg.src = "img/ar_off.png";
    document.getElementById('collapse_ar').style.display = "none";
  }
  block_device("ar_img",3000);
}

function sendVolume_IncreaseAr(){
  socket.emit('ar_volume', "increase");
}

function sendVolume_DecreaseAr(){
  socket.emit('ar_volume', "decrease");
}

function sendArHome(){
  socket.emit('ar_function', "ar_On_Off");
}

function Increase_ar(){
  if(volume_ar < 26){
    volume_ar++;
    document.getElementById("volume_ar").innerHTML = volume_ar;
  }
}

function decrease_ar(){
  if(volume_ar > 17){
    volume_ar--;
    document.getElementById("volume_ar").innerHTML = volume_ar;
  }
}

function block_device(id_device,temp_device){
  document.getElementById(id_device).disabled = true;
  document.getElementById(id_device).style.cursor = "not-allowed";
  setTimeout(function(){ 
    document.getElementById(id_device).disabled = false;
    document.getElementById(id_device).style.cursor = "pointer";
  }, temp_device);
}

//FUNÇÃO PARA BLOQUEAR EM 5 SEGUNDOS
function block(id_func){
  if(id_func == "cmn-toggle-2"){
    document.getElementById("toogle_all").style.cursor = "not-allowed";
    setTimeout(function(){ 
    document.getElementById("toogle_all").style.cursor = "pointer";
  }, 1000);
  }
  document.getElementById(id_func).disabled = true;
  document.getElementById(id_func).style.cursor = "not-allowed";
  setTimeout(function(){ 
    document.getElementById(id_func).disabled = false;
    document.getElementById(id_func).style.cursor = "pointer";
  }, 1000);
}

function block_all(){
  block("lampbathroom");
  block("lampkitchen");
  block("lampbedroom");
  block("lamp1Sala");
  block("lamp2Sala");
}

(function(){
  setTimeout(function(){
    location.reload();
  }, 1000000);
})();
