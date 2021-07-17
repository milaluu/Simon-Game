var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var startflag = false;


// Game start by pressing a key
$(document).keypress(function() {
  // when keyboard is pressed for the first time, start game and trigger nextSequence()
  if (!startflag) {
    $("#level-title").text("Level " + level);
    nextSequence();
    startflag = true;
  }
});


// User click
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  animate(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);  //check the most recent userChosenColour
});


// Game in New level
function nextSequence() {

  userClickedPattern = []; // new sequence, reset userClickedPattern as a empty array
  level++;  // a new level
  $("#level-title").text("Level " + level); // update the level title


  var randomNumber = Math.floor(Math.random() * 4); //  generate a random number 0-3
  var randomChosenColour = buttonColours[randomNumber]; // choose color in buttonColours according to the number
  gamePattern.push(randomChosenColour); // add the random chosen color to gamePattern

  var currentbuttonId = "#" + randomChosenColour; // get the id of the chosen button
  $(currentbuttonId).fadeOut(200).fadeIn(200); // animate a flash to the chosen button
  playSound(randomChosenColour); // play the corresponding sound of the chosen button
}


// Play the corresponding sound when a button is chosen
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// Add animation to the chosen button
function animate(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}


// Check the click button is right or not
function checkAnswer(currentLevel) {
  // check if the most recent user answer equals to gamePattern answer
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    // once the user clicked, the length of userClickedPattern will add 1
    // so check if the user has chosen and clicked enough times
    if (userClickedPattern.length === gamePattern.length) {
    // No, continue click button and trigger checkAnswer fuction
    // Yes, delay 1000ms and trigger nextSequence fuction(New level..)
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("wrong");
    // play sound and add "game-over" animation to the background-color
    playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(function() {
        $('body').removeClass("game-over");
    }, 200);
    startOver(); // reset some variables to restart
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}


// Game over
function startOver()
{
  level = 0;
  gamePattern = [];
  startflag = false;
}
