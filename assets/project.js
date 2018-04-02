
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

  // expanding navbar:
//   $('input[type="text"]').focus(function() {
//     $(this).animate({
//         width: $(this).width()*2.5,
//         height: $(this).height()*1.5
//     });
//     var newFontSize = parseInt($(this).css("font-size"));
//     newFontSize = newFontSize * 1.5;
//     $(this).css({
//         'font-size': newFontSize
//     });
// });

// $('input[type="text"]').blur(function() {
//     $(this).animate({
//         width: $(this).width()/2.5,
//         height: $(this).height()/1.5
//     });
//     var newFontSize = parseInt($(this).css("font-size"));
//     newFontSize = newFontSize / 1.5;
//     $(this).css({
//         'font-size': newFontSize
    });
});

var someSearch = "";
var anotherSearch = "";
var yetAnotherSearch = "";
var lastSearch = 0;

$("#submitbutton").on("click", function() {
    event.preventDefault();
    console.log("test")

    someSearch = $("#first-search").val().trim();
      anotherSearch = $("#second-search").val().trim();
      yetAnotherSearch = $("#third-search").val().trim();
      lastSearch = $("#fourth-search").val().trim();
      database.ref().push({

        someSearch: someSearch,
        anotherSearch: anotherSearch,
        yetAnotherSearch: yetAnotherSearch,
        lastSearch: lastSearch
      });
});

database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val().someSearch);
    console.log(childSnapshot.val().anotherSearch);
    console.log(childSnapshot.val().yetAnotherSearch);
    console.log(childSnapshot.val().lastSearch);

    var newRow = $('<tr>');

    $(newRow).append("<td class='somesearch'>" + childSnapshot.val().someSearch +
    " </td><td class= 'anotherSearch'>" + childSnapshot.val().anotherSearch +
    " </td><td class= 'yetanothersearch'>" + childSnapshot.val().yetAnotherSearch +
    " </td><td class= 'lastsearch'>" + childSnapshot.val().lastSearch + " </td>");
 
    $("tbody").append(newRow);
    console.log(newRow);
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });

  
