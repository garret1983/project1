
$(document).ready(function () {

    $(document).on("click", ".venue-data", function () {

        var config = {
            apiKey: "AIzaSyAHrta93HNxWis2qKRoXMAWRxJwOwTzdJY",
            authDomain: "project1-7d97b.firebaseapp.com",
            databaseURL: "https://project1-7d97b.firebaseio.com",
            projectId: "project1-7d97b",
            storageBucket: "project1-7d97b.appspot.com",
            messagingSenderId: "758804415452"
        };
        firebase.initializeApp(config);

        var database = firebase.database();

        // $("#map").empty();

        //Clear markers
        //On click add marker for clicked venue

        // on click
        // clear all the pins
        // zoom in on lat/long of selected address 
        //get the lat/long from the address clicked
        var latLong = {
            lat: parseFloat($(this).attr("data-latitude")),
            lng: parseFloat($(this).attr("data-longitude"))
        };
        database.ref().set(latLong);

        console.log(latLong);
        // show new pin
        // $(this).attr()
        // marker.setMap(null);
        addMarkerAndZoom(latLong, 16);

        function initMap() {
            var markers = [];
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 8,
                center: { lat: 38.899265, lng: -77.1546525 }
            });

            // On click clear all the map markers and zoom in on lat/long of selected address 
            //then get the lat/long from the address clicked.
            // var markers = [];
            var latLong = {
                lat: parseFloat($(this).attr("data-latitude")),
                lng: parseFloat($(this).attr("data-longitude"))
            };

            addMarkerAndZoom(latLong, 16); //Call function to add marker and zoom in on maker on click event.
            console.log(latLong);

        }
    });

    function addMarker(center) {
        marker = new google.maps.Marker({
            position: center,
            map: map
        });
    }

    function clear() {
        $("#event-table > tbody").empty();
    }

    function eventSearch() {
        $("#run-search").on("click", function (event) {
            event.preventDefault();

            // Captures the users input for zipcode and raduis search.
            var userZipcodeInput = $("#zipcode-input").val().trim();
            var userRadiusInput = $("#radius-input").val().trim();

            console.log("User entered zipcode: " + userZipcodeInput);
            console.log("User entered radius: " + userRadiusInput);

            //JamBase API access
            var jamBaseApiKey = 'rd4cbvwrqcws2awychydytcu';
            // var jamBaseApiKey = 'erwbvawfptrfgmanwnwsd7xx';
            // var jamBaseApiKey = 'rgwerqp2yxbccsm5u8cfjruu';
            // var jamBaseApiKey = '87jvmqkbmt8g2hvathpm4pdm';

            var jamBaseQueryURL = "https://api.jambase.com/events?zipCode=" +
                userZipcodeInput + "&radius=" +
                userRadiusInput + "&page=0&api_key=" + jamBaseApiKey;

            // clear out table for new results
            $("#event-table > tbody").empty();

            $.ajax({
                url: jamBaseQueryURL,
                method: "GET"
            }).then(function (response) {

                var results = response.Events; //Creates a new object.
                // console.log(results.length);
                console.log(results)

                for (var i = 0; i < results.length; i++) {
                    var eventDate = results[i].Date;
                    var artistsName = results[i].Artists[0].Name;
                    var venueName = results[i].Venue.Name;
                    var venueAddress = results[i].Venue.Address;
                    var venueCity = results[i].Venue.City;
                    var venueState = results[i].Venue.State;
                    var url = results[i].TicketUrl;
                    var latitude = results[i].Venue.Latitude;
                    var longitude = results[i].Venue.Longitude;

                    addMarker({ lat: latitude, lng: longitude })
                    map.setCenter({ lat: latitude, lng: longitude });

                    var prettyEventDate = moment(eventDate).format("MMMM DD, YYYY");
                    // console.log(prettyEventDate);
                    // console.log(moment);
                    // console.log(eventDate);

                    var venueRow = $("<tr/>");
                    venueRow.addClass("venue-data");
                    venueRow.attr("data-latitude", results[i].Venue.Latitude);
                    venueRow.attr("data-longitude", results[i].Venue.Longitude);

                    venueRow.append("<td>" +
                        prettyEventDate + "</td><td>" +
                        artistsName + "</td><td>" +
                        venueName + "</td><td class='address'>" +
                        venueAddress + "</td><td>" +
                        venueCity + "</td><td>" +
                        venueState + "</td>");

                    $("#event-table > tbody").append(venueRow);

                }
            });
        });


    }
    eventSearch();
    $("#clear-all").on("click", clear);

    //NO CODE BELOW THIS LINE
});
