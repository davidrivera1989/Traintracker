
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDgOy0uXpIzjBuI1X544Vk1oiK-jWO04is",
    authDomain: "train-tracker-dc57f.firebaseapp.com",
    databaseURL: "https://train-tracker-dc57f.firebaseio.com",
    storageBucket: "train-tracker-dc57f.appspot.com",
    messagingSenderId: "669622390487"
  };
firebase.initializeApp(config);
var database = firebase.database();

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


  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#Destination-input").val("");
  $("#time-input").val("");
  $("#Frequency-input").val("");
  
  return false;
});

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
 
  var realTime = moment.unix(trainTime).format("HH:mm-millitary time");
 
  var nextTrain = moment().diff(moment.unix(trainTime, "X"), "HH:mm-millitary time");
  console.log(nextTrain);

  var trainAway = nextTrain * trainMin;
  console.log(trainAway);
  // Add each train's data into the table
  var newRow = $('<tr>');
  newRow.append("<td>" + trainName + "</td><td>" + trainDest + "</td><td>" + realTime + "</td><td>" + nextTrain + "</td><td>" + trainMin + "</td><td>" + trainAway + "</td>");
  $("#schedule-table").append(newRow);
});
