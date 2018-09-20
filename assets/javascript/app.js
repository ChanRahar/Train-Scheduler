var config = {
	apiKey: "AIzaSyDuSo5J_ZxMH3bthkmU8SjLF0ctaZ0Wuw8",
	authDomain: "trial-28809.firebaseapp.com",
	databaseURL: "https://trial-28809.firebaseio.com",
	projectId: "trial-28809",
	storageBucket: "trial-28809.appspot.com",
	messagingSenderId: "580303554130"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {

	$("#addTrainBtn").on("click", function () {

		var trainName = $("#trainName").val().trim();
		var destination = $("#destination").val().trim();
		var trainTime = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");;
		var frequency = $("#frequency").val().trim();

		var newTrain = {
			name: trainName,
			destination: destination,
			trainTime: trainTime,
			frequency: frequency,
		}

		database.ref().push(newTrain);

		$("#trainName").val("");
		$("#destination").val("");
		$("#trainTime").val("");
		$("#frequency").val("");

		return false;
	});

	database.ref().on("child_added", function (childSnapshot) {


		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTime = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;

		var timeRemainder = moment().diff(moment.unix(firebaseTrainTime), "minutes") % firebaseFrequency;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrain = moment().add(minutes, "m").format("hh:mm A");

		$("#tableTrain").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrain + "</td><td>" + minutes + "</td></tr>");

	});
});
