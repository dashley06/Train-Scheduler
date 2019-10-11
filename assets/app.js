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

  });

  //function runs on new child added
  database.ref().on("child_added", function(snapshot){
      //console.log(snapshot.val());

        var trainFrequencyData = snapshot.val().freqMin
        console.log("!!!", trainFrequencyData);
        var firstTrainData = snapshot.val().firstTrain

        console.log("!!!!!", firstTrainData)

        var firstTimeConverted = moment(firstTrainData, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted, "firstTimeConvert")
        var currentTime = moment();

      // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log(diffTime, "differ")
        var remainder = diffTime % freqMin;
        console.log(remainder, "remainder")
        var tMinutesforTrain = freqMin - remainder;
        console.log(tMinutesforTrain, "min for train")
        var nextTrain = moment().add(tMinutesforTrain, "minutes");
     
      $("#trainNameDisplay").append(snapshot.val().trainName + "<hr>")
      $("#destination").append(snapshot.val().destination + "<hr>")
      $("#trainFrequency").append(snapshot.val().freqMin + "<hr>")
      $("#firstTrain").append(firstTrainData + "<hr>")
      $("#minAway").append(tMinutesforTrain + "<hr>")
      $("#nextArrival").append(moment(nextTrain).format("hh:mm") + "<hr>")
     
      //create removal button
      var remove = $("<button>");
       $("#remove").append(remove)
       $("#remove").append("<hr>")
      remove.addClass("removeButton").attr("data-key")
      remove.text("Remove");

$(".removeButton").on("click", function(event){
  event.preventDefault();
  removeRow(); 
  console.log("!!!");
});

function removeRow() {
  $(".row" + $(this).attr("data-key")).empty();
  database.ref().child($(this).attr("data-key")).empty();
  console.log(this);
}; 
     
  });

