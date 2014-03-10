var TIMER_DEFAULT_IN_SECONDS = 1500;

// Timer class
function Timer(updateCallback) {
	this.updateCallback = updateCallback;
	this.intervalID = 0;
	this.timeRemaining = 0;
	this.targetTime = 0;
	this.updateIntervalInMs = 200;
	this.lastSetTime = 0;
};

Timer.prototype.start = function() {
	startTime = new Date().getTime();
	this.targetTime = startTime + this.timeRemaining;
	var t = this;
	this.intervalID = setInterval(function() { t.update(); }, this.updateIntervalInMs);
};

Timer.prototype.pause = function() {
	clearInterval(this.intervalID);
};

Timer.prototype.reset = function() {
	this.pause();
	this.timeRemaining = this.lastSetTime;
};

Timer.prototype.setTime = function(seconds) {
	this.timeRemaining = seconds * 1000;
	this.lastSetTime = this.timeRemaining;
};

Timer.prototype.update = function() {
	var now = new Date().getTime();
	this.timeRemaining = this.targetTime - now;
	var secondsRemaining = Math.floor(this.timeRemaining / 1000);

	// How to assign a function to a class property and call it here?
	// this.updateCallback(secondsRemaining);
	updateTimerDisplay(secondsRemaining);
};

var timer;

window.onload = init;

function init() {
	var startButton = document.getElementById("startPauseButton");
	startButton.addEventListener("click", startPauseButtonPressed, false);
	var resetButton = document.getElementById("resetButton");
	resetButton.addEventListener("click", resetButtonPressed, false);
	timer = new Timer(updateTimerDisplay);
	timer.setTime(TIMER_DEFAULT_IN_SECONDS);
	updateTimerDisplay(timer.lastSetTime / 1000);
};

function startPauseButtonPressed() {
	var button = document.getElementById("startPauseButton");
	var oldText = button.innerHTML;
	if (oldText == "Start") {
		setupTimer();
		timer.start();
		button.innerHTML = "Pause";
	} else {
		timer.pause();
		button.innerHTML = "Start";
	}
};

function resetButtonPressed() {
	timer.reset();
	var button = document.getElementById("startPauseButton");
	button.innerHTML = "Start";
	updateTimerDisplay(timer.lastSetTime / 1000);
}

function setupTimer() {
	var text = document.getElementById("minutes");
	var minutes = parseInt(text.value);
	if (!isNaN(minutes)) { // User entered a new time.
		text.value = "";
		timer.setTime(minutes * 60);
	}
}

function updateTimerDisplay(secondsRemaining) {
	var hours = parseInt(secondsRemaining / 3600);
	secondsRemaining = secondsRemaining % 3600;
	var minutes = parseInt(secondsRemaining / 60);
	var seconds = parseInt(secondsRemaining % 60);
	var countdown = document.getElementById("countdown");
	countdown.innerHTML = hours + "h "+ minutes + "m " + seconds + "s";
};
