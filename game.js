var randomNumber = "";
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor = "";
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

startGame();

$(".btn").click(function(e) {
  var userClickedColor = String(e.target.id);
  userClickedPattern.push(userClickedColor);
  soundOnEvent(userClickedColor);
  animatePress(userClickedColor);
  checkAnswer();
  //console.log(userClickedColor);
});

function startGame() {
  $(document).on("keydown", function(e) {
    if (level == 0) {
      randomChosenColor = nextSequence();
      $("#level-title").text("Level " + level);
    }
  });
}

function nextSequence() {
  randomNumber = Math.floor(3 * Math.random()) + 1;
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //console.log(gamePattern);
  soundOnEvent(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn();
  level += 1;
  return randomChosenColor;
}

function soundOnEvent(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
}

function animatePress(key) {
  var id = "#" + key;
  $(id).addClass("pressed");
  setTimeout(function() {
    $(id).removeClass("pressed");
  }, 100);
}

//check the current userClickedPattern array vs current gamePattern array everytime a button is clicked.
function checkAnswer() {
  for (
    var i = userClickedPattern.length - 1;
    i < userClickedPattern.length;
    i++
  ) {
    if (userClickedPattern[i] !== gamePattern[i]) {
      soundOnEvent("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("You lose! Press any key to restart!");
      startOver();
      //startGame();
    } else if (
      userClickedPattern[i] === gamePattern[i] &&
      userClickedPattern.length === gamePattern.length
    ) {
      setTimeout(nextSequence, 1000);
      $("#level-title").text("Level " + level);
      userClickedPattern = [];
    }
  }
}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
}
