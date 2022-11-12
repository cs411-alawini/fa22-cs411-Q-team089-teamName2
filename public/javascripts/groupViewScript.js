console.log("Client-side code running");

var avgCompRate = document.getElementById("avgCompRate");
var mostProdDay = document.getElementById("mostProdDay");

var avgCompRateBtn = document.getElementById("avgCompRateBtn");
var mostProdDayBtn = document.getElementById("mostProdDayBtn");

avgCompRateBtn.addEventListener('click', function(err) {
  fetch('/groupView/avgCompRate', {method: 'GET'}).then(function(res) {
    if(res.ok) {
      return res.json();
    }
    throw new Error('Request Failed');
  }).then(function(jsonObj) {
    avgCompRate.innerHTML = jsonObj.avgCompRate;
  }).catch(function(err) {
    console.log(err);
  });
});

mostProdDayBtn.addEventListener('click', function(err) {
  fetch('/groupView/mostProdDay', {method: 'GET'}).then(function(res) {
    if(res.ok) {
      return res.json();
    }
    throw new Error('Request Failed');
  }).then(function(jsonObj) {
    mostProdDay.innerHTML = jsonObj.mostProdDay;
  }).catch(function(err) {
    console.log(err);
  });
});