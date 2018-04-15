$(function () {
  var weatherData = null;

  navigator.geolocation.getCurrentPosition(fetchWeatherData);

  function fetchWeatherData(position) {
    var urlString = "https://fcc-weather-api.glitch.me/api/current" +
      "?lat=" + position.coords.latitude +
      "&lon=" + position.coords.longitude;

    $.get(urlString, saveWeatherData);
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

  var setBackground = (function () {
    var isSet = false;

    return function () {
      if (!isSet) {
        isSet = true;
        // Base64 encoded SVGs
        var svgThermometer = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4NCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMTAxMy4xKSI+DQogICAgPHBhdGggZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjNjIwNTA1IiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik01MCAxMDIyLjVjLTIuNyAwLTUuNCAxLjUtNS41IDYuNXY1Ny40YTkuNSA5LjUgMCAwIDAtNCA3LjggOS41IDkuNSAwIDAgMCA5LjUgOS41IDkuNSA5LjUgMCAwIDAgOS41LTkuNSA5LjUgOS41IDAgMCAwLTQtNy44VjEwMjljMC01LTIuOC02LjUtNS41LTYuNXoiLz4NCiAgICA8cGF0aCBmaWxsPSIjNjIwNTA1IiBzdHJva2U9IiM2MjA1MDUiIGQ9Ik01MCAxMDc4LjFoNS40bS01LjQtOS40aDUuNG0tNS40LTkuNGg1LjRtLTUuNC05LjRoNS40bS01LjQtOS40aDUuNE01MCAxMDMxaDUuNCIvPg0KICAgIDxjaXJjbGUgY3g9IjUwIiBjeT0iMTA5NC4zIiByPSI1IiBmaWxsPSIjNjIwNTA1IiBzdHJva2U9IiM2MjA1MDUiIHN0cm9rZS13aWR0aD0iMiIvPg0KICAgIDxwYXRoIHN0cm9rZT0iIzYyMDUwNSIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNDguOCAxMDU2LjVoMi41djMzaC0yLjV6Ii8+DQogICAgPGNpcmNsZSBjeD0iNDgiIGN5PSIxMDkyLjkiIHI9Ii42IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPg0KICA8L2c+DQo8L3N2Zz4=";
        var svgAnemoVane = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj4NCiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAtMjcwLjUpIj4NCiAgICA8ZyBzdHJva2Utd2lkdGg9IjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC40IC02NTYuNykiPg0KICAgICAgPGNpcmNsZSBjeD0iNDkuNiIgY3k9Ijk0NC40IiByPSI1IiBmaWxsPSIjNjIwNTA1IiBzdHJva2U9IiM2MjA1MDUiLz4NCiAgICAgIDxjaXJjbGUgY3g9IjQ3LjMiIGN5PSI5NDIuNSIgcj0iMSIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIi8+DQogICAgPC9nPg0KICAgIDxwYXRoIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzYyMDUwNSIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNDggMjg4LjVoNFYzNjBoLTR6Ii8+DQogICAgPHBhdGggZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjNjIwNTA1IiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0yOC41IDI4NS43aDQzdjRoLTQzeiIvPg0KICAgIDxjaXJjbGUgY3g9IjI3LjQiIGN5PSIyODcuNyIgcj0iNi42IiBmaWxsPSIjNjIwNTA1IiBzdHJva2U9IiM2MjA1MDUiIHN0cm9rZS13aWR0aD0iMiIvPg0KICAgIDxjaXJjbGUgY3g9IjI0LjMiIGN5PSIyODQuOSIgcj0iMS4zIiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPg0KICAgIDxnIHN0cm9rZS13aWR0aD0iMS44IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0MC45IC03ODAuNCkgc2NhbGUoMS4xMzAwMSkiPg0KICAgICAgPGNpcmNsZSBjeD0iMjguMSIgY3k9Ijk0NS4zIiByPSI1LjkiIGZpbGw9IiM2MjA1MDUiIHN0cm9rZT0iIzYyMDUwNSIvPg0KICAgICAgPGNpcmNsZSBjeD0iMjUuNSIgY3k9Ijk0Mi44IiByPSIxLjIiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIvPg0KICAgIDwvZz4NCiAgICA8cGF0aCBmaWxsPSIjZmZmIiBzdHJva2U9IiM2MjA1MDUiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTk0IDMzNS41TDc2IDMyMmwxOC0xMy43LTUuNSAxMy43eiIvPg0KICAgIDxwYXRoIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzYyMDUwNSIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTMuNSAzMjBoNjV2My43aC02NXoiLz4NCiAgICA8cGF0aCBmaWxsPSIjZmZmIiBzdHJva2U9IiM2MjA1MDUiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE4LjUgMzI5LjNsLTEyLjktNy40IDEyLjktNy41LTQgNy41eiIvPg0KICAgIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYyMDUwNSIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNTAgMjg1LjV2NCIvPg0KICA8L2c+DQo8L3N2Zz4=";

        var mainBackground =
          "linear-gradient(to bottom, rgba(255,255,255,0.8) 0%,rgba(255,255,255,0.8) 100%)" + ", " +
          "url('data:image/svg+xml;base64," + svgThermometer + "')" + " no-repeat right 30% bottom 170px" + ", " +
          "url('data:image/svg+xml;base64," + svgAnemoVane + "')" + " no-repeat right -15px bottom 5px";

        $("#main").css('background', mainBackground);
        $("#main").css('background-size', "100%, 225px, 175px");
      }
    };
  })();

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
    $("#description").html(toTitleCase(weatherData.weather[0].description));

    $(".message").css('display', 'none');
    $(".data").css('display', 'block');

    setBackground();
  }

  $("input[type=radio]").change(function () {
    if (weatherData)
      updateWeatherDisplay();
  });
});