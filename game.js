var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("h1").text("level " + level);
  level++;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass('pressed');
  setTimeout(function() {
    document.querySelector("#" + currentColor).classList.remove("pressed");
  }, 100);
}

function checkAnswer(currentlevel) {
  if (userClickedPattern[currentlevel] === gamePattern[currentlevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    var wrongAns = new Audio("sounds/wrong.mp3");
    wrongAns.play();
    setTimeout(function() {
      document.querySelector("body").classList.remove("game-over");
    }, 100);
    startOver();
  }
}
function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}
$(document).keypress(function() {
  if (level === 0) {
    nextSequence();
    $("h1").text("level " + level);
  }
})
$(".btn").click(function() {
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
})
