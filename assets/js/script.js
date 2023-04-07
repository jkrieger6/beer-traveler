var userInputEl = document.querySelector("#searchCriteria");
var APIKey = "5b2b7b9a047f3cbe2fa1edd5d1203608";

var searchBtnEl = document.querySelector("#searchBtn");
searchBtnEl.addEventListener("click", addResult);

searchBtnEl.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("searchBtn").click();
  }
});

/*searchBtnEl.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    
  }
});*/

function addResult(event) {
  event.preventDefault();
  let userInputEl = document.querySelector("#searchCriteria");
  var cityInput = userInputEl.value;
  console.log(cityInput);

  // $("#current-weather").attr("style", "display:inline-block");
  console.log(cityInput);
  searchCity(cityInput);
}

// function to get lat, lon of city
function searchCity(userInput) {
  document.querySelector("#weatherPane").innerHTML = "";
  // api search function goes here
  var geoUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
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
      setMap(geoLon, geoLat);
    });
  console.log("Your city is: " + userInput);
}

// function to get current weather for searched city
function currentWeather(weatherObj) {
  // var dateTime = weatherObj.dt_txt;
  var tempData = weatherObj.main.temp;
  var windSpeedData = weatherObj.wind.speed;
  var currentConditionsData = weatherObj.weather[0].description;
  var weatherIcon = weatherObj.weather[0].icon;
  imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
  var cityEl = $("#weatherPane");
  cityEl.append($("<div>").text(" Temp: " + tempData + "F"));
  cityEl.append($("<div>").text(" Wind Speed: " + windSpeedData + "mph"));
  cityEl.append($("<div>").text(" Conditions: " + currentConditionsData));
  cityEl.append($("<img>").attr("src", imgSrc));
}

// function to get forecasted weather for searched city from earlier called API
function getForecast(arrayOfWeatherObjs) {
  var list = $("#weatherPane");
  console.log(arrayOfWeatherObjs);
  for (let i = 0; i < arrayOfWeatherObjs.length; i++) {
    var obj = arrayOfWeatherObjs[i];
    var dayTimeDisplay = obj.dt_txt;
    if (obj.dt_txt.includes("12:00:00")) {
      var forecastListItems = $("<li>");
      var forecastTempData = Math.floor(obj.main.temp);
      var forecastWindSpeedData = Math.floor(obj.wind.speed);
      var forecastCoonditions = obj.weather[0].description;
      var forecastWeatherIcon = obj.weather[0].icon;
      imgSrc =
        "https://openweathermap.org/img/wn/" + forecastWeatherIcon + ".png";
      forecastListItems.append($("<div>").text(dayTimeDisplay));
      forecastListItems.append(
        $("<div>").text(" Temp: " + forecastTempData + "F")
      );
      forecastListItems.append(
        $("<div>").text(" Wind Speed: " + forecastWindSpeedData + "mph")
      );
      forecastListItems.append(
        $("<div>").text(" Condtions: " + forecastCoonditions)
      );
      forecastListItems.append($("<img>").attr("src", imgSrc));
      list.append(forecastListItems);
    }
  }
}

// calls Open weather API to get weather
function getWeatherData(lat, lon) {
  $("#weatherPane").addClass("list-group");
  $("#weatherPane").append($("<ol>"));
  $("#weatherPane").attr("style", "display:inline-block");

  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
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
    });
}
var searchEL = document.querySelector("#searchBtn");

searchEL.addEventListener("click", searchBreweries);

//search function for breweries
function searchBreweries() {
  userInputEl = document.querySelector("#searchCriteria").value;
  document.querySelector("#beerGlass").innerHTML = "";

  const endpoint =
    "https://api.openbrewerydb.org/breweries?by_city=" +
    userInputEl +
    "&per_page=8";
  fetch(endpoint)
    .then((response) => response.json())
    .then(data => {
      // Loop through list of breweries and display information
      data.forEach(brewery => {
        const breweryElement = document.createElement("div");
        breweryElement.classList.add("brewery");

        const breweryName = document.createElement("h2");
        breweryName.textContent = brewery.name;
        breweryElement.appendChild(breweryName);

        const breweryType = document.createElement("p");
        breweryType.textContent = brewery.brewery_type;
        breweryElement.appendChild(breweryType);

        const breweryAddress = document.createElement("p");
        breweryAddress.textContent = `${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.postal_code}`;
        breweryElement.appendChild(breweryAddress);

        document.querySelector("#beerGlass").appendChild(breweryElement);
      });
    })
    .catch(error => console.error(error));
}

// define the OpenLayers map object
var map = new ol.Map("#myCity");

// define the search box element and add an event listener
var searchBox = userInputEl.value;
var searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", function () {
  var city = searchBox.value;
  //getCityLatLng(city);
});

function setMap(lon, lat) {
  console.log(ol);
  document.querySelector("#myCity").innerHTML = "";
  map = new ol.Map({
    target: "myCity",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([lon, lat]),
      zoom: 10,
    }),
  });
}

function updateMapView(map, lat, lon) {
  var view = map.getView();
  view.setCenter([lon, lat]);
  view.setZoom(12); // adjust the zoom level as needed
}
