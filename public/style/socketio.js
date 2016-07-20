var io = io.connect();
       // Send the ready event.
       io.emit('readySensors');
       // Listen for the new visitor event.
       io.on('controlData', function(data) {
       console.log(data);
       var temp_bathroom = data.temp_bathroom.toFixed(1);
       var temp_kitchen = data.temp_kitchen.toFixed(1);
       var temp_bedroom = data.temp_bedroom.toFixed(1);
       var temp_room =  data.temp_room.toFixed(1);
       var temp_media = data.temp_media.toFixed(1); 
		   
    document.getElementById('temperature_bathroom').innerHTML = temp_bathroom + 'º';
    document.getElementById('temperature_kitchen').innerText = temp_kitchen + 'º';
    document.getElementById('temperature_bedroom').innerText = temp_bedroom + 'º';
		document.getElementById('temperature_bedroom_front').innerText = temp_bedroom + 'º';
    document.getElementById('temperature_room').innerText  =  temp_room + 'º';
    document.getElementById('temperature_media').innerText =  temp_media + 'º';
});
