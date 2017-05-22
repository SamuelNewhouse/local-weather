/*
https://openweathermap.org/current#geo

api.openweathermap.org/data/2.5/weather?lat=???&lon=???&APPID=91d37ac558e79e36d4fbe8a39af5bee8
*/
var kTemp = 0.0;
var isFaren = true;

function setFaren() {
  $(".tempH1").html(Math.round(kTemp * 9 / 5 - 459.67));
  $(".unitH1").html("F");
}
function setCelc() {
  $(".tempH1").html(Math.round(kTemp - 273.15));
  $(".unitH1").html("C");
}

$(document).ready(function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      $.getJSON(
        "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" +
        position.coords.latitude +
        "&lon=" +
        position.coords.longitude +
        "139&APPID=91d37ac558e79e36d4fbe8a39af5bee8",
        function (result) {
          console.log(result);
          $(".locH1").html(result.name);
          kTemp = result.main.temp;
          $(".tempH1").html(kTemp);
          setFaren();
          $(".wIcon").html("<img src='http://openweathermap.org/img/w/" + result.weather[0].icon + ".png'>");
          $(".wDesc").html(result.weather[0].main);
        });
    });
  }

  $(".unitH1").on("click", function () {
    if (isFaren)
      setCelc();
    else
      setFaren();
    isFaren = !isFaren;
  });
});