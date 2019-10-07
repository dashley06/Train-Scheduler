//Firebase
var config = {
    apiKey: "AIzaSyCVT0Ays4I6djiYKfIL82tbx3037FpNZq4",
    authDomain: "train-scheduler-70f92.firebaseapp.com",
    databaseURL: "https://train-scheduler-70f92.firebaseio.com",
    projectId: "train-scheduler-70f92",
    storageBucket: "",
    messagingSenderId: "1071862885573",
    appId: "1:1071862885573:web:f916549da6ce61ed5114ac",
    measurementId: "G-9KRL4HV180"
  };

firebase.initializeApp(config);

var database = firebase.database();

// variables
  var trainName = "";
  var destination = "";
  var freqMin = "";
  var firstTrain = "";
  var minsAway = "";
  var tMinutes;
  var tArrival;


$("#submit-button").on("click", function (event) {
    event.preventDefault();

//user inputs
      trainName = $("#trainInput").val().trim();
      destination = $("#destinationInput").val().trim();
      freqMin = $("#freqInput").val().trim();
      firstTrain = $("#firstTrainInput").val().trim();

//update variables with database
     database.ref().push({
          trainName: trainName,
          destination: destination,
          freqMin: freqMin,
          firstTrain: firstTrain
     });

     //$("#trainNameInput").val("");
     //$("#destinationInput").val("");
     //$("#freqInput").val("");
     //$("#firstTrainInput").val("");
  });

  //function runs on new child added
  database.ref().on("child_added", function(snapshot){
      //make sure it works
      console.log(snapshot.val());

      var trainFrequencyData = snapshot.val().freqMin
      var firstTrainData = snapshot.val().firstTrain

      //split hours from minutes
        var timeArr = firstTrainData.split(":");
        var firstTimeConverted = moment(firstTrainData, "hh:mm").subtract(1, "years");
        var currentTime = moment();
   

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   ;
      var remainder = diffTime % freqMin;
      var tMinutesforTrain = freqMin - remainder;
      var nextTrain = moment().add(tMinutesforTrain, "minutes");
     
     
      $("#trainNameDisplay").append(snapshot.val().trainName + "<hr>")
      $("#destination").append(snapshot.val().destination + "<hr>")
      $("#trainFrequency").append(snapshot.val().freqMin + "<hr>")
      $("#firstTrain").append(snapshot.val().firstTrain + "<hr>")

      //get the val of minsaway and append it to The minsAway
      $("#minAway").append(tMinutesforTrain + "<hr>")
      
      $("#nextArrival").append(moment(nextTrain).format("hh:mm") + "<hr>")
  });