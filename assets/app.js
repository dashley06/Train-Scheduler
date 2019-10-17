$(document).ready(function () {

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
  var tFrequency;
  var firstTrain;



$("#submit-button").on("click", function (event) {
    event.preventDefault();

//user inputs
      trainName = $("#trainInput").val().trim();
      destination = $("#destinationInput").val().trim();
      tFrequency = $("#freqInput").val().trim();
      firstTrain = $("#firstTrainInput").val().trim()
//update variables with database
      database.ref().push({
          trainName: trainName,
          destination: destination,
          tFrequency: tFrequency,
          firstTrain: firstTrain
 });


  //function runs on new child added
  database.ref().on("child_added", function(snapshot){

      var firstTime = firstTrain;
            console.log("first train", firstTime)
    
      var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
            console.log(firstTimeConverted, "First time Converted");
  
      // Current Time
      var currentTime = moment(new Date());
            console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
      
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE: " + diffTime);
  
      
      var tRemainder = diffTime % tFrequency;
            console.log(tRemainder);
  
      
      var tMinutes = tFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutes);
  
      
      var nextTrain = moment().add(tMinutes, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  
      $("#trainNameDisplay").append(snapshot.val().trainName + "<hr>")
      $("#destination").append(snapshot.val().destination + "<hr>")
      $("#trainFrequency").append(snapshot.val().tFrequency + "<hr>")
      $("#firstTrain").append(firstTrain + "<hr>")
      $("#minAway").append(tMinutes + "<hr>")
      $("#nextArrival").append(moment(nextTrain).format("hh:mm") + "<hr>");
      

    // Clears all of the text-boxes
      $("#trainInput").val("");
      $("#destinationInput").val("");
      $("#freqInput").val("");
      $("#firstTrainInput").val("");
});

 //create removal button
      var remove = $("<button>");
      $("#remove").append(remove);
      $("#remove").append("<hr>");
      remove.addClass("removeButton").attr("data-key");
      remove.text("Remove");

      $(".removeButton").on("click", function(event){
      $(this).click(function(event){
             event.preventDefault();
            $("#trainRow").remove();
            return false;
        });
           
  });  


});



});