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
    $("#current-time").html(moment().format('h:mm'));
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

    // test with console log
    // console.log(trainInfo.name);
    // console.log(trainInfo.destination);
    // console.log(trainInfo.start);
    // console.log(trainInfo.frequency);
  };

  // ATTACH ADDTRAIN FUNCTION TO SUBMIT BUTTON
  $(".addInfoButton").on('click', addTrain);

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
    // make sure trainStart input is calculated as happening previous to the current time
    trainStartMoment = moment(trainStart, "HH:mm").subtract(1, "days");
    console.log("train start moment " + trainStartMoment)
    // time between current time and the first train start (current time minus train start)
    var diffTime = moment().diff(moment(trainStartMoment), "minutes");
    console.log("difference in time " + trainStartMoment);
    // (current time minus train start) divide by the frequency
    var timeApart = diffTime % trainFrequency;
    console.log(": " + timeApart);

    var minutesUntilTrain = trainFrequency - timeApart;
    console.log("MINUTES UNTIL TRAIN: " + minutesUntilTrain);


    // calculate the next arrival time
    // add minutes until train to current time
    var nextTrainTime = moment().add(minutesUntilTrain, "minutes");

    // create new table rows that display the data
    var tableRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(moment(nextTrainTime).format("HH:mm")),
      $("<td>").text(minutesUntilTrain),
    );

    $(".trainTable").append(tableRow);
  });
})