$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDD2WHJgXYOnWX21hcFbAXdbXNQ33kogR8",
    authDomain: "train-scheduler-f2785.firebaseapp.com",
    databaseURL: "https://train-scheduler-f2785.firebaseio.com",
    projectId: "train-scheduler-f2785",
    storageBucket: "train-scheduler-f2785.appspot.com",
    messagingSenderId: "651468417552"
  };
  firebase.initializeApp(config);

  // GLOBAL VARIABLES
  var database = firebase.database();

  // SHOW CURRENT TIME
  $("#current-time").text(moment().format('h:mm:ss a'));

  // ATTACH ADDTRAIN FUNCTION TO SUBMIT BUTTON
  $(".addInfoButton").on('click', addTrain);

  // FUNCTION TO STORE USER INPUT INTO DATABASE
  // --------------------------------
  var addTrain = function () {
    // get info from specific elements in form
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainStart = $("#train-start").val().trim();
    var trainFrequency = $("#frequency").val().trim();

    // create object to store data
    var trainInfo = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      frequency: trainFrequency,
    };

    // put input into database
    database.ref("trains").push(trainInfo);

    // test with console log
    // console.log(trainInfo.name);
    // console.log(trainInfo.destination);
    // console.log(trainInfo.start);
    // console.log(trainInfo.frequency);
  };

  // ADD USER INPUT TO HTML
  // ------------------------
  database.ref("trains").on("child_added", function (snapshot) {
    // console.log(snapshot);
    var a = snapshot.val();
    // console.log(a);
    //  make variables to hold the data that was just stored
    var trainName = a.name;
    var trainDestination = a.destination;
    var trainStart = a.time;
    var trainFrequency = a.frequency;

    // calculate next train arrival
    // current time minus when train starts running then divide by frequency = number of times train has run already
    // number of times train has run, multiply frequency, add start time = previous arrival time
    // previous arrival time plus frequency = next train arrival 

    // calculate minutes until next arrival
    // next train arrival minus current time = minutes until arrival

    // create new table rows that display the data
    var tableRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(''),
      $("<td>").text(''),
    );

    $(".trainTable").append(tableRow);
  });
})