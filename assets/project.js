

var config = {
  apiKey: "AIzaSyAHrta93HNxWis2qKRoXMAWRxJwOwTzdJY",
  authDomain: "project1-7d97b.firebaseapp.com",
  databaseURL: "https://project1-7d97b.firebaseio.com",
  projectId: "project1-7d97b",
  storageBucket: "",
  messagingSenderId: "758804415452"
};
firebase.initializeApp(config);

var database = firebase.database();


var eventType = "";
var Location = "";
var userChoice = "";
var lat = "";
var lng = "";

console.log(map);



$("#submitbutton").on("click", function (event) {
  event.preventDefault();


  var eventType = $('#first-search').val();
  console.log(eventType)
  var searchLocation = $('#second-search').val();

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': searchLocation
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      lat = results[0].geometry.location.lat()
      lng = results[0].geometry.location.lng()
      getLocationData(lat, lng, eventType);
    }
  });



});

function getLocationData(lat, long, eventName) {
  var apiURL = 'https://proxy-cbc.herokuapp.com/proxy';
  var googleQueryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + lat + "," + long + "&radius=10000&name=" + eventName + "&key=AIzaSyDNapfN0EoPw9nVEKqfANCL4dTNjNDU06U";
  
  $.ajax({
    url: apiURL,
    method: 'POST',
    data: {
      'url': googleQueryURL
    }
  }).done(function (response) {
    console.log("from proxy", response);
    for(var i = 0; i < response.data.results.length; i++) {
      console.log(response.data.results[i]);
      var markerData = response.data.results[i];
      createMarker(markerData);
    }
  });
}


var infowindow;



function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}



function createMarker(place) {
 
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });


  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}



database.ref().on("child_added", function (childSnapshot) {

  console.log(childSnapshot.val().firstsearch);
  console.log(childSnapshot.val().secondsearch);

  var newRow = $('<tr>');

  $(newRow).append("<td class='somesearch'>" + childSnapshot.val().eventType +
    " </td><td class= 'anotherSearch'>" + childSnapshot.val().location +
    " </td>");

  $("tbody").append(newRow);

}, function (errorObject) {

});


var apiKey = 'rd4cbvwrqcws2awychydytcu';
var zipcode = 92102;
var queryURL = "http://api.jambase.com/venues?zipCode=" + zipcode + "&page=0&api_key=" + apiKey;




var apiURL = 'https://proxy-cbc.herokuapp.com/proxy';












