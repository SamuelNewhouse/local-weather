$(function () {
  var weatherData = null;

  if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(fetchWeatherData);
  else
    return;

  function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
      return match.toUpperCase();
    });
  }

  function fetchWeatherData(position) {
    var urlString = "https://fcc-weather-api.glitch.me/api/current" +
      "?lat=" + position.coords.latitude +
      "&lon=" + position.coords.longitude;

    $.get(urlString, saveWeatherData);
  }

  function saveWeatherData(data) {
    console.log(data);
    if (data.coord)
      weatherData = data;
    updateWeatherDisplay();
  }

  function updateWeatherDisplay() {
    $("#temperature > p").html(Math.round(weatherData.main.temp) + " C");
    $(".weather-icon").html('<img src="' + weatherData.weather[0].icon + '">');
    $("#wind > p").html(weatherData.wind.speed + " knots");

    $("#location > p").html(weatherData.name);
    $("#description > p").html( toTitleCase(weatherData.weather[0].description) );
  }

});