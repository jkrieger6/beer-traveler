var userInputEl = $('#searchCriteria');
var APIKey = "5b2b7b9a047f3cbe2fa1edd5d1203608";

var beerApi = 'https://api.openbrewerydb.org/v1/breweries?by_city=%27userInput%27&per_page=5'

$("#searchBtn").on("click", addResult);

// $(document).ready(function(){
//     $("#searchBtn").click(function (){
//         var userInput = $(userInputEl).val();
//         $("#weatherPane").attr("style", "display:inline-block");
//         searchCity(userInput);
//     });
// });

function addResult(event) {
    event.preventDefault();
    var cityInput = userInputEl.val();
    // $("#current-weather").attr("style", "display:inline-block");
    searchCity(cityInput);
  }

function searchCity(userInput) {
    // api search function goes here
    var geoUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" +
    userInput +
    "&limit=5&appid=" +
    APIKey;
    fetch(geoUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var cityData = data[0];
        console.log(cityData);
        var geoLat = cityData.lat;
        var geoLon = cityData.lon;
        getWeatherData(geoLat, geoLon, cityData);
    })
    console.log("Your city is: " + userInput);
}

function currentWeather(weatherObj) {
    // var dateTime = weatherObj.dt_txt;
    var tempData = weatherObj.main.temp;
    var windSpeedData = weatherObj.wind.speed;
    var currentConditionsData = weatherObj.weather[0].description;
  var weatherIcon = weatherObj.weather[0].icon;
  imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
  var cityEl =$("#weatherPane");
  cityEl.append($("<div>").text(" Temp: " + tempData + "F"));
  cityEl.append($("<div>").text(" Wind Speed: " + windSpeedData + "mph"));
  cityEl.append($("<div>").text(" Conditions: " + currentConditionsData));
  cityEl.append($("<img>").attr("src", imgSrc));
}

function getForecast(arrayOfWeatherObjs) {
    var list = $("#weatherPane");
    console.log(arrayOfWeatherObjs);
    for (let i = 0; i < arrayOfWeatherObjs.length; i++) {
        var obj = arrayOfWeatherObjs[i];
        var dayTimeDisplay = obj.dt_txt;
        if(obj.dt_txt.includes("12:00:00")) {
            var forecastListItems = $("<li>");
            var forecastTempData = Math.floor(obj.main.temp);
            var forecastWindSpeedData = Math.floor(obj.wind.speed);
            var forecastCoonditions = obj.weather[0].description;
            var forecastWeatherIcon = obj.weather[0].icon;
            imgSrc = "https://openweathermap.org/img/wn/" + forecastWeatherIcon + ".png";
            forecastListItems.append($("<div>").text(dayTimeDisplay));
            forecastListItems.append($("<div>").text(" Temp: " + forecastTempData + "F"));
            forecastListItems.append($("<div>").text(" Wind Speed: " + forecastWindSpeedData + "mph"));
            forecastListItems.append($("<div>").text(" Condtions: " + forecastCoonditions));
            forecastListItems.append($("<img>").attr("src", imgSrc));
            list.append(forecastListItems);
        }
    }
}

function getWeatherData(lat, lon) {
    // $("#weatherPane").empty();
    $("#weatherPane").addClass("list-group");
    $("#weatherPane").append($("<ol>"));
    $("#weatherPane").attr("style", "display:inline-block");
    
    var weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    APIKey;

    fetch(weatherUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      currentWeather(data.list[0]);
        getForecast(data.list);
    })
}