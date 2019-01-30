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


  var database = firebase.database();



  // store user input into database
  // --------------------------------
  // attach event to form's submit button
  $(".addInfoButton").on('click', function (event) {
    console.log("I've been clicked!")
    // get info from specific elements in form
    // var trainName = $(".train-name").val().trim();
    // var trainDestination = $(".destination").val().trim();
    // var trainTime = $(".train-time").val().trim();
    // var trainFrequency = $(".frequency").val().trim();

    // // create object to store data
    // var trainInfo = {
    //   name: trainName,
    //   destination: trainDestination,
    //   time: trainTime,
    //   frequency: trainFrequency,
    // };

    // // put input into database
    // database.ref().push(trainInfo);

    // // test with console log
    // console.log(trainInfo.name);
    // console.log(trainInfo.destination);
    // console.log(trainInfo.time);
    // console.log(trainInfo.frequency);
  });

  // add user input to html
  // ------------------------
  // make variables to hold the data that was just stored
  // create new table rows that display the data


})