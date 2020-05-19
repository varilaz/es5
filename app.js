"use strict"

searchButton.addEventListener('click', searchWeather);


function searchWeather(event){
    loadingText.style.display = "block";
    weatherBox.style.display = "none";
    var cityName = searchCity.value;
    if(cityName.trim().length == 0){
        return alert('Please enter a City Name');
    }
    var http = new XMLHttpRequest();
    var apiKey = 'bd2b8917dd9aac293c3bfbe3334d17db';
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + apiKey;
    var method = 'GET';


    http.open(method, url);
    http.onreadystatechange = function(event){
        if(http.readyState === XMLHttpRequest.DONE && http.status === 200){
            var data = JSON.parse(http.responseText);
            console.log(data.coord);
            var weatherData = new Weather(
                cityName,
                data.weather[0].description.toUpperCase(),
                data.coord, 
                data.main.temp,
            );
            weatherData.temperatureK = data.main.temp;
            console.log(weatherData.coord.lat);
            var lat = weatherData.coord.lat;
            var lng = weatherData.coord.lon;
            var desc = weatherData.description;
            var tempC = weatherData.temperatureC;
            var tempK = weatherData.temperatureK;
            initMap(lat, lng, desc, tempC, tempK);
            updateWeather(weatherData);
            
        }else if (http.readyState === XMLHttpRequest.DONE){
            alert('Something went wrong!')
        }
    }

    http.send()
}


function updateWeather(weatherData){
    //weatherCity.textContent = weatherData.cityName;
    weatherDesc.textContent = weatherData.description;
    weatherTempC.textContent = weatherData.temperatureC.toFixed(1) + " C";
    weatherTempK.textContent = weatherData.temperatureK + " K";

    //weatherCity.style.display = 'none';
    loadingText.style.display = "none";
    weatherBox.style.display = "block";
    weatherMap.style.margin = "0px 0px 0px 0px";
   
}



function initMap(lat, lng, desc, tempC, tempK, map) {

    var map;
    if(lat && lng){
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: lat, lng: lng},
            zoom: 13
        });
        var marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            title: desc + ': ' + tempC + ' C'
          });
    } else {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 12.97, lng: 12.59},
            zoom: 2
        });
    }   
    
}