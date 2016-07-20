exports.temperature = function(){
	// TEMPERATURA
    var B = 3975;
    var media = 0;
    // Analog SENSORS READING
    var analog_bathroom = app.sensors.temp_bathroom.analogRead();
    var analog_kitchen = app.sensors.temp_kitchen.analogRead();
    var analog_bedroom = app.sensors.temp_bedroom.analogRead();
    var analog_room = app.sensors.temp_room.analogRead();
    // READING CONFIGURATION --------|
    var resistance_bathroom = (1023 - analog_bathroom) * 10000 / analog_bathroom; //get the resistance of the sensor;
    var resistance_kitchen = (1023 - analog_kitchen) * 10000 / analog_kitchen; //get the resistance of the sensor;
    var resistance_bedroom = (1023 - analog_bedroom) * 10000 / analog_bedroom; //get the resistance of the sensor;
    var resistance_room = (1023 - analog_room) * 10000 / analog_room; //get the resistance of the sensor;
    var celsius_temperature_bathroom = 1 / (Math.log(resistance_bathroom / 10000) / B + 1 / 298.15) - 273.15;
    var celsius_temperature_kitchen = 1 / (Math.log(resistance_kitchen / 10000) / B + 1 / 298.15) - 273.15;
    var celsius_temperature_bedroom = 1 / (Math.log(resistance_bedroom / 10000) / B + 1 / 298.15) - 273.15;
    var celsius_temperature_room = 1 / (Math.log(resistance_room / 10000) / B + 1 / 298.15) - 273.15;

   media = (celsius_temperature_bathroom + celsius_temperature_kitchen + celsius_temperature_bedroom + celsius_temperature_room)/4;
   socket.emit('controlData',{
        temp_bathroom:celsius_temperature_bathroom,
        temp_kitchen:celsius_temperature_kitchen,
        temp_bedroom:celsius_temperature_bedroom,
        temp_room:celsius_temperature_room,
        temp_media:media
    });
};