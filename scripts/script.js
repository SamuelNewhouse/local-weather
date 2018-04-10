$(function () {  
  var weatherData = null;

  navigator.geolocation.getCurrentPosition(fetchWeatherData);

  function fetchWeatherData(position) {
    var urlString = "https://fcc-weather-api.glitch.me/api/current" +
      "?lat=" + position.coords.latitude +
      "&lon=" + position.coords.longitude;

    $.get(urlString, saveWeatherData);
    console.log(urlString);
  }

  function saveWeatherData(data) {
    weatherData = data;
    updateWeatherDisplay();
  }

  function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  function degreesToDirection(degrees) {
    var directionArray = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];
    var normalDirection = degrees % 360;
    var compassSector = Math.round(normalDirection / 45);

    return directionArray[compassSector];
  }

  function updateWeatherDisplay() {
    var temperatureNumber = weatherData.main.temp;
    var windNumber = weatherData.wind.speed;
    var windDirection = degreesToDirection(weatherData.wind.deg);

    var temperatureUnit = $("input[type=radio][name=temperature-unit]:checked").val();
    var windUnit = $("input[type=radio][name=wind-unit]:checked").val();

    if (temperatureUnit == "Fahrenheit") {
      temperatureNumber = temperatureNumber * 1.8 + 32;
      temperatureUnit = "F";
    }
    else
      temperatureUnit = "C";

    switch (windUnit) {
      case "kph":
        windNumber *= 1.852;
        break;
      case "mph":
        windNumber *= 1.151;
        break;
    }

    temperatureNumber = Math.round(temperatureNumber);
    windNumber = Math.round(windNumber);

    $("#location").html(weatherData.name);

    $("#temperature-number").html(temperatureNumber);
    $("#temperature-unit").html(temperatureUnit);

    $("#wind-number").html(windNumber);
    $("#wind-unit").html(windUnit);
    $("#wind-direction").html(windDirection);

    $(".weather-icon").html('<img src="' + weatherData.weather[0].icon + '">');
    $("#description > p").html(toTitleCase(weatherData.weather[0].description));

    $(".message").css('display', 'none');
    $(".data").css('display', 'block');
  }

  $("input[type=radio]").change(function () {
    if (weatherData)
      updateWeatherDisplay();
  });
});