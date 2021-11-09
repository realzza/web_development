var XMLHttpRequest = require("xhr2");

var url = "https://api.ebird.org/v2/data/obs/CN-32/recent/notable?detail=full";
// var url =
// "https://api.ebird.org/v2/data/obs/geo/recent?lat=1.3005&lng=134.7290";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.setRequestHeader("X-eBirdApiToken", "npdrmid0i3am");

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    console.log(xhr.status);
    console.log(xhr.responseText);
  }
};

xhr.send();
