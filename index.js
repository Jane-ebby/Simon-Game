
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		$("#mobile-title").text("Level " + level);

		nextSequence();
		started = true;
	}
});

$("#mobile-start-btn").click(function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		$("#mobile-title").text("Level " + level);

		$("#mobile-start-btn").prop('disabled', true)
		$("#mobile-start-btn").html('In Progress')
		$("#mobile-desc").hide()

		nextSequence();
		started = true;
	}
});




$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");

	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);

	checkAnswer(userClickedPattern.length - 1);

});



function checkAnswer(currentLevel) {
	console.log("current level is: ", currentLevel)
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("success");
		if (userClickedPattern.length === gamePattern.length) {

			setTimeout(function () {
				nextSequence();
			}, 1000);

		}

	} else {

		console.log("wrong");

		playSound("wrong");

		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		$("#level-title").text("Game Over, Press Any Key to Restart");
		$("#mobile-title").text("Game Over, Score: " + (level - 1))
		$("#mobile-desc").show()
		$("#mobile-desc").text("Press 'Start' to restart")



		startOver();

	}

}


function nextSequence() {

	userClickedPattern = [];

	level++;

	$("#level-title").text("Level " + level);
	$("#mobile-title").text("Level " + level);

	var randomNumber = Math.floor(Math.random() * 4);

	var randomChosenColour = buttonColours[randomNumber];

	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

	var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
	audio.play();

	playSound(randomChosenColour);

}



function playSound(name) {

	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}


function animatePress(currentColor) {

	$("#" + currentColor).addClass("pressed");

	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}
function startOver() {
	level = 0;
	gamePattern = [];
	started = false;

	$("#mobile-start-btn").prop('disabled', false);
	$("#mobile-start-btn").html("Start")

}



