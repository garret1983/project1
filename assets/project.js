$(document).ready(function () {

  function eventSearch() {
      $("#run-search").on("click", function (event) {
          event.preventDefault();

          // Captures the users input for zipcode and raduis search.
          var userZipcodeInput = $("#zipcode-input").val().trim();
          var userRadiusInput = $("#radius-input").val().trim();
          // console.log("User entered zipcode: "+userZipcodeInput);
          // console.log("User entered radius: "+userRadiusInput);

          //JamBase API access
          // var jamBaseApiKey = 'rd4cbvwrqcws2awychydytcu';
          // var jamBaseApiKey = 'erwbvawfptrfgmanwnwsd7xx';
          var jamBaseApiKey = 'rgwerqp2yxbccsm5u8cfjruu';

          var jamBaseQueryURL = "http://api.jambase.com/events?zipCode=" +
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


                  var prettyEventDate = moment(eventDate).format("MMMM DD, YYYY");
                  // console.log(prettyEventDate);
                  // console.log(moment);
                  // console.log(eventDate);

                  $("#event-table > tbody").append("<tr><td>" +
                      prettyEventDate + "</td><td>" +
                      artistsName + "</td><td>" +
                      venueName + "</td><td>" +
                      venueAddress + "</td><td>" +
                      venueCity + "</td><td>" +
                      venueState + "</td></tr>");
              }
          });
      });
  } eventSearch();
  //NO CODE BELOW THIS LINE
});

  
