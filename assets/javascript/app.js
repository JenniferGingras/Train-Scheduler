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
  var getTime = function () {
    $("#current-time").html("Time is now " + moment().format('h:mm a'));
  }
  setInterval(getTime, 1000)


  // FUNCTION TO STORE USER INPUT INTO DATABASE
  // --------------------------------
  var addTrain = function () {
    // get info from specific elements in form
    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainStart = $("#train-start").val();
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

    // clear the form
    $("#train-name").val("");
    $("#destination").val("");
    $("#train-start").val("");
    $("#frequency").val("");
  };

  // only take valid input
  var validateInput = function () {
    if ($("input").val() === "") {
      return false;
    } else {
      addTrain();
    };
  };

  // ATTACH ADDTRAIN FUNCTION TO SUBMIT BUTTON
  $(".addInfoButton").on('click', validateInput);


  // ADD USER INPUT TO HTML
  // ------------------------
  database.ref("trains").on("child_added", function (snapshot) {
    // console.log(snapshot);
    var a = snapshot.val();
    console.log(a);
    //  make variables to hold the data that was just stored
    var trainName = a.name;
    var trainDestination = a.destination;
    var trainStart = a.start;
    console.log("this is trainStart " + trainStart);
    var trainFrequency = a.frequency;


    // calculate minutes until next arrival
    // if the user inputs a start time later than the current time it screws things up, this doesn't fix that error, but it returns a calculation and I'm using it for now
    trainStartMoment = moment(trainStart, "HH:mm").subtract(1, "years");
    console.log("train start moment " + trainStartMoment);
    // time between current time and the first train start (current time minus train start)
    var diffTime = moment().diff(moment(trainStartMoment), "minutes");
    console.log("difference in time " + trainStartMoment);
    // (current time minus train start) divide by the frequency
    var minutesApart = diffTime % trainFrequency;
    console.log(": " + minutesApart);

    var minutesAway = trainFrequency - minutesApart;
    console.log("minutes until train: " + minutesAway);


    // calculate the next arrival time
    // add minutes until train to current time
    var nextTrain = moment().add(minutesAway, "minutes");

    // create new table rows that display the data
    var tableRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(moment(nextTrain).format("LT")),
      $("<td>").text(minutesAway),
    );

    $(".trainTable").append(tableRow);
  });


})