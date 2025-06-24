$(document).on("keydown", function () {
  if (flag && game_pattern.length === 0) {
    nextRound();
  }
});

function resetGame() {
  game_pattern = [];
  user_inp = 0;
  level = 0;
  flag = true;
  $("h1").text("Press A Key to Start");
  $("h2").text("Level- 0");
}

var col = ["green", "red", "yellow", "blue"];
var game_pattern = [];
var flag = true;
var user_inp = 0;
var level = 0;

$(".btn").on("click", function () {
if (!flag) return;
  var colorPressed = this.id;
  if (user_inp < game_pattern.length && colorPressed === col[game_pattern[user_inp]]) {
    makesound(colorPressed);
    makeanimation(colorPressed);
    user_inp++;
    if (user_inp === game_pattern.length) {
        level++;
      setTimeout(nextRound, 1000); // give a break before next round
    }
  } 
  else {
    flag = false;
    makesound(colorPressed);
    makeanimation(colorPressed);
    level = 0;
    $("h1").text("❌ Game Over, Press A Key to Go Home");
    $(document).one("keydown", resetGame);
  }
});

function nextRound() {
  if (!flag) return;
  $("h2").text("Level- " + (level+1) + "  Score: "+ (level));
  var no = Math.floor(Math.random() * 4);
  game_pattern.push(no);
  user_inp = 0;
  setTimeout(function () {
      makesound(col[no]);
      makeanimation(col[no]);
    }, 400);
    $("h1").text("");
}

function makesound(key) {
  if (!flag) {
    var over = new Audio("sounds/wrong.mp3");
    over.play();
  } else {
    var soundPath = "sounds/" + key + ".mp3";
    var audio = new Audio(soundPath);
    audio.play();
  }
}

function makeanimation(key) {
  $("." + key).addClass("pressed");
  if (!flag) {
    $("body").addClass("game-over");
  }

  setTimeout(function () {
    $("." + key).removeClass("pressed");
    if (!flag) {
      $("body").removeClass("game-over");
    }
  }, 100);
}
