window.onload = init;

// set the date we're counting down to
var target_date = new Date("Mar 8, 2014").getTime();

// variables for time units
var days, hours, minutes, seconds;

var t;

function startAndStopTimer() {
	var button = document.getElementById("start");
	var oldText = button.innerHTML;
	if (oldText == "Start") {
		t = setInterval(timer, 1000);
		button.innerHTML = "Stop";
	} else {
		clearInterval(t);
		button.innerHTML = "Start";
	}
}

function init() {
	var startButton = document.getElementById("start");
	startButton.addEventListener("click", startAndStopTimer, false);

	timer();
	// update the tag with id "countdown" every 1 second
	// t = setInterval(timer, 1000);
}

function timer() {
	// get tag element
	var countdown = document.getElementById("countdown");

	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = (target_date - current_date) / 1000;

	hours = parseInt(seconds_left / 3600);
	seconds_left = seconds_left % 3600;

	minutes = parseInt(seconds_left / 60);
	seconds = parseInt(seconds_left % 60);

	// format countdown string + set tag value
	countdown.innerHTML = hours + "h "
	+ minutes + "m " + seconds + "s";
}