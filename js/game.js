$("body").removeClass("game-over");
//for keyboard event
$("body").keypress(function(event){

var key = event.key;
if(key === "i"){ var c = "red"; keyevent(c);}
if(key === "o"){ var c = "green"; keyevent(c);}
if(key === "k"){ var c = "yellow"; keyevent(c);}
if(key === "l"){ var c = "blue"; keyevent(c);}
});

function keyevent(c){
  var userChosenColour = c;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  $("h2").text("You are using a keyboard, when you lose, it will put you on level 1 again.");

}
//end of the keyevents

var buttonColours = ["red", "green", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//for mobile
$('#play').click(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
    });
//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function() {
  if (!started) {

    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//when button clicked
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  $("h2").text("");
  });

  //1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
  function checkAnswer(currentLevel) {

      //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
      if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {$("body").removeClass("game-over");}, 200);
        $("#level-title").text("Game Over, Press Any Key or click on play button (mobile) to Restart");
        startOver();
        }

  }

function nextSequence(){
    userClickedPattern = [];
  //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
  level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  //for blink
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //for audio
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
