/* global firebase moment */
// Steps to complete:
// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve train from the train tracker database.
// 4. Create a way to calculate the mins. Using difference between start and current time.
//    Then use moment.js formatting to set difference in time away.
// 5. Calculate Total billed
// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgOy0uXpIzjBuI1X544Vk1oiK-jWO04is",
    authDomain: "train-tracker-dc57f.firebaseapp.com",
    databaseURL: "https://train-tracker-dc57f.firebaseio.com",
    storageBucket: "train-tracker-dc57f.appspot.com",
    messagingSenderId: "669622390487"
  };
firebase.initializeApp(config);
var database = firebase.database();
// 2. Button for adding Trains
$("#add-train").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#Destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "DD/MM/YY").format("X");
  var trainMin = $("#Frequency-input").val().trim();
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    first: trainTime,
    min: trainMin
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.first);
  console.log(newTrain.min);
  // Alert
  alert("Train successfully added");
  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#Destination-input").val("");
  $("#time-input").val("");
  $("#Frequency-input").val("");
  // Prevents moving to new page
  return false;
});
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().first;
  var trainMin = childSnapshot.val().min;
  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainMin);
  // Prettify the train start
  var realTime = moment.unix(trainTime).format("HH:mm-millitary time");
  // Calculate the next arrival time using hardcore math
  // To calculate the time.
  var nextTrain = moment().diff(moment.unix(trainTime, "X"), "HH:mm-millitary time");
  console.log(nextTrain);
  // 
  var trainAway = nextTrain * trainMin;
  console.log(trainAway);
  // Add each train's data into the table
  $("#Train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>");
  // +
  // realTime + "</td><td>" + nextTrain + "</td><td>" + trainMin + "</td><td>" + trainAway + "</td></tr>");
});
// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016
// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case