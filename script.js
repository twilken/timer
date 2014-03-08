var SECONDS_PER_MINUTE = 60;
var SECONDS_PER_HOUR = 3600;
var MILLISECONDS_PER_SECOND = 1000;
var TIMER_UPDATE_INTERVAL = 1000;

window.onload = init;

// set the date we're counting down to
var target_date = new Date("Mar 10, 2014").getTime();

// variables for time units
var hours, minutes, seconds;

var t;

function startAndStopTimer() {
	var button = document.getElementById("start");
	var oldText = button.innerHTML;
	if (oldText == "Start") {
		t = setInterval(timer, TIMER_UPDATE_INTERVAL);
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
	var seconds_left = (target_date - current_date) / MILLISECONDS_PER_SECOND;

	hours = parseInt(seconds_left / SECONDS_PER_HOUR);
	seconds_left = seconds_left % SECONDS_PER_HOUR;

	minutes = parseInt(seconds_left / SECONDS_PER_MINUTE);
	seconds = parseInt(seconds_left % SECONDS_PER_MINUTE);

	// format countdown string + set tag value
	countdown.innerHTML = hours + "h "
	+ minutes + "m " + seconds + "s";
}