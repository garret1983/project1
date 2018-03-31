

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
// var yetAnotherSearch = "";
// var lastSearch = "";

$("#submitbutton").click("click", function (event) {
  event.preventDefault();
  //console.log("test")
  createMarker('event')

})

var map;
var infowindow;

function myMap() {
  var myLatLng = { lat: 32.715736, lng: -117.161087 };

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng

  });

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(),
    map: map,
    title: 'hello world!'

  });

  marker.setMap(map);

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: myLatLng,
    radius: 500,
    type: ['venue']
  }, callback);
}

// $("#submitbutton").click("click", function (event) {
//   event.preventDefault();
//   //console.log("test")
//   createMarker('event')

  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
    }
  }

//});

console.log("results")

function createMarker(place) {
  var myLatLng = place.geometry, location
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry
  });
  //console.log("location")

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

// $("#submitbutton").on("click", function () {
//   event.preventDefault();
//   //console.log("test")
//   createMarker("place");

//   eventType = $("#first-search").val().trim();
//   location = $("#second-search").val().trim();
//   // yetAnotherSearch = $("#third-search").val().trim();
//   // lastSearch = $("#fourth-search").val().trim();
//   database.ref().push({

//     eventType: eventType,
//     location: location,
//     // yetAnotherSearch: yetAnotherSearch,
//     // lastSearch: lastSearch
//   });
// });
//console.log(eventType)

database.ref().on("child_added", function (childSnapshot) {

  console.log(childSnapshot.val().firstsearch);
  console.log(childSnapshot.val().secondsearch);
  // console.log(childSnapshot.val().yetAnotherSearch);
  // console.log(childSnapshot.val().lastSearch);

  var newRow = $('<tr>');

  $(newRow).append("<td class='somesearch'>" + childSnapshot.val().eventType +
    " </td><td class= 'anotherSearch'>" + childSnapshot.val().location +
    " </td>");

  $("tbody").append(newRow);
  //console.log(newRow);
}, function (errorObject) {
  //console.log("Errors handled: " + errorObject.code);
});

//JamBase API access
var apiKey = 'rd4cbvwrqcws2awychydytcu';
var zipcode = 92102;
var queryURL = "http://api.jambase.com/venues?zipCode=" + zipcode + "&page=0&api_key=" + apiKey;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log(response);

  var results = response.Venues;
  console.log(results)
});

var apiKey = "AIzaSyDDrbDbmKvV--aXzByi0KA2UnJgs6t2qeg";
var googleQueryURL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=50000&types=food&name=fo&key=AIzaSyDNapfN0EoPw9nVEKqfANCL4dTNjNDU06U";
var zipcode = 92102;

$.ajax({
  url: googleQueryURL,
  method: "GET",
  contentType: 'jsonp'
}).then(function (response) {
  console.log("from google places", response);
});

//proxy url for the class
var apiURL = 'https://proxy-cbc.herokuapp.com/proxy';


$.ajax({
  url: apiURL,
  method: 'POST',
  data: {
    'url': googleQueryURL
  }
}).done(function (response) {
  console.log("from proxy", response);


});









