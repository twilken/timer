var TIMER_DEFAULT_IN_SECONDS = 1500;

// Timer class implements a simple timer. On every update event updateCallback
// gets called. When the Timer finishes finishedCallback gets called.
function Timer(updateCallback, finishedCallback) {
	this.updateCallback = updateCallback;
	this.finishedCallback = finishedCallback;
	this.intervalID = 0;
	this.timeRemaining = 0;
	this.targetTime = 0;
	this.updateIntervalInMs = 200;
	this.lastSetTime = 0;
};

// Start or resume the timer.
Timer.prototype.start = function() {
	startTime = new Date().getTime();
	this.targetTime = startTime + this.timeRemaining;
	var t = this;
	this.intervalID = setInterval(function() { t.update(); }, this.updateIntervalInMs);
};

// Pause the timer.
Timer.prototype.pause = function() {
	clearInterval(this.intervalID);
};

// Reset the timer to its last set time. The setTime function is the only
// way to set the time.
Timer.prototype.reset = function() {
	this.pause();
	this.timeRemaining = this.lastSetTime;
};

// Set the timer to timeInSeconds.
Timer.prototype.setTime = function(timeInSeconds) {
	this.timeRemaining = timeInSeconds * 1000;
	this.lastSetTime = this.timeRemaining;
};

// Update keeps track of the passed time and executes callbacks. There is no
// need to call this method, it gets called automatically.
Timer.prototype.update = function() {
	var now = new Date().getTime();
	this.timeRemaining = this.targetTime - now;
	if (this.timeRemaining <= 0) {
		this.timeRemaining = 0;
		this.pause();
		this.finishedCallback();
	}
	var secondsRemaining = Math.floor(this.timeRemaining / 1000);
	this.updateCallback(secondsRemaining);
};

var timer;
window.onload = init;
var browserSupportsNotifications = false;
var userAllowsNotifications = false;

// Initial setup
function init() {
	var startButton = document.getElementById("startPauseButton");
	startButton.addEventListener("click", startPauseButtonPressed, false);
	var resetButton = document.getElementById("resetButton");
	resetButton.addEventListener("click", resetButtonPressed, false);
	timer = new Timer(updateTimerDisplay, timeIsUp);
	timer.setTime(TIMER_DEFAULT_IN_SECONDS);
	updateTimerDisplay(timer.lastSetTime / 1000);
	var minutes = document.getElementById("minutes");
	minutes.value = TIMER_DEFAULT_IN_SECONDS / 60;
	setupNotifications();
};

// If notifications are not already allowed, ask the user for permission.
// Right now this is not properly supported in Chrome.
function setupNotifications() {
	if ("Notification" in window) { // Browser supports notifications
		browserSupportsNotifications = true;
		if (Notification.permission === "granted") { // User already allows Notifications
			userAllowsNotifications = true;
		}
		else {
			Notification.requestPermission( function(permission) {
				if (permission === "granted") {
					userAllowsNotifications = true;
				}
			});
		}
	}

};

// Event handler method for the startPauseButton.
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

// Event handler method for the resetButton.
function resetButtonPressed() {
	timer.reset();
	var button = document.getElementById("startPauseButton");
	button.innerHTML = "Start";
	updateTimerDisplay(timer.lastSetTime / 1000);
}

// Set timer to the time enterered into the minutes text field.
function setupTimer() {
	var text = document.getElementById("minutes");
	var minutes = parseInt(text.value);
	if (!isNaN(minutes)) { // User entered a new time.
		text.value = "";
		timer.setTime(minutes * 60);
	}
}

// Update the timer display to secondsReminaing.
function updateTimerDisplay(secondsRemaining) {
	var hours = parseInt(secondsRemaining / 3600);
	secondsRemaining = secondsRemaining % 3600;
	var minutes = parseInt(secondsRemaining / 60);
	var seconds = parseInt(secondsRemaining % 60);
	var countdown = document.getElementById("countdown");
	countdown.innerHTML = hours + "h "+ minutes + "m " + seconds + "s";
};

// Do everything that needs to be done when the timer reaches zero.
function timeIsUp() {
	var sound = new Audio('audio/timeIsUp.mp3');
	sound.play();
	var button = document.getElementById("startPauseButton");
	button.innerHTML = "Start";
	var text = document.getElementById("minutes");
	text.value = timer.lastSetTime / 1000 / 60;
	if (browserSupportsNotifications && userAllowsNotifications) {
		var options = new Object();
		options.icon = "favicon.ico";
		var notification = new Notification("Time is up!", options);
	}
}