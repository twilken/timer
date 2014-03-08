// Constants
var SECONDS_PER_MINUTE = 60;
var SECONDS_PER_HOUR = 3600;
var MILLISECONDS_PER_SECOND = 1000;
var TIMER_UPDATE_INTERVAL = 1000;

window.onload = init;

// set the date we're counting down to
var target_date;
var secondsOnTimer = 1500;
var timerIntervalID

function init() {
	var startButton = document.getElementById("startStopButton");
	startButton.addEventListener("click", startStopButtonPressed, false);
}

function startStopButtonPressed() {
	var button = document.getElementById("startStopButton");
	var oldText = button.innerHTML;
	if (oldText == "Start") {
		startTimer(secondsOnTimer);
		button.innerHTML = "Stop";
	} else {
		stopTimer();
		button.innerHTML = "Start";
	}
}

function startTimer(seconds) {
	var current_date = new Date().getTime();
	targetDate = current_date + (seconds * MILLISECONDS_PER_SECOND);
	timerIntervalID = setInterval(function() { timer(targetDate); },
		TIMER_UPDATE_INTERVAL);
}

function stopTimer() {
	clearInterval(timerIntervalID);
}

function timer(targetDate) {
	// variables for time units
	var hours, minutes, seconds;

	// get tag element
	var countdown = document.getElementById("countdown");

	// find the amount of "seconds" between now and target
	var current_date = new Date().getTime();
	var seconds_left = (targetDate - current_date) / MILLISECONDS_PER_SECOND;

	hours = parseInt(seconds_left / SECONDS_PER_HOUR);
	seconds_left = seconds_left % SECONDS_PER_HOUR;

	minutes = parseInt(seconds_left / SECONDS_PER_MINUTE);
	seconds = parseInt(seconds_left % SECONDS_PER_MINUTE);

	// format countdown string + set tag value
	countdown.innerHTML = hours + "h "
	+ minutes + "m " + seconds + "s";
}
