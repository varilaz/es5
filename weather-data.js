"use strict";

function Weather(cityName, description, coord, temperatureC){
    this.cityName = cityName;
    this.description = description;
    this.coord = coord,
    this.temperatureC  = temperatureC;
    this._temperatureK = '';
}


Object.defineProperty(Weather.prototype, 'temperatureK',{
    get: function(){
        return this._temperatureK;
    },
    set: function(value){
        this._temperatureK = (value * 1.8 + 32).toFixed(1);
    }
});