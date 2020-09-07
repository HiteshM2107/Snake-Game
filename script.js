/********************************** window load *********************************************** */
// onload function
window.onload = function () {
  //on window load, display greet screen and hide play area
  document.getElementById("play").style.display = "none";
  document.getElementById("greet").style.display = "flex";

  //start event listner, set frame interval etc etc..
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000 / 10);
};
/********************************************************************************************** */

/********************************** button event handlers *********************************************** */

//get the button id and store it into a variable
var playbutton = document.getElementById("playBtn");
var resetbutton = document.getElementById("resetBtn");
var backbutton = document.getElementById("backBtn");

// function to reset board and the scores.
function reset() {
  // reset velocity of snake
  xv = yv = 0;
  // reset score and highscore
  score = high_score = 0;
  //reset length of snake
  tail = 0;
}

// function to handle button taps

//onclick function to handle the play button click
playbutton.onclick = function () {
  //hide the greeting screen and display play area
  document.getElementById("play").style.display = "flex";
  document.getElementById("greet").style.display = "none";
};

// onclick function to handle the reset button click
resetbutton.onclick = function () {
  reset();
};

// onclick function to handle the back button click
backbutton.onclick = function () {
  document.getElementById("play").style.display = "none";
  document.getElementById("greet").style.display = "flex";
  reset();
};

/********************************************************************************************** */

/********************************** gameplay logic *********************************************** */

//   player(the snake) location in the canvas
px = py = 10;
// grid size and tile count
gs = tc = 20;
// location of apple
ax = ay = 15;
//   velocity of snake
xv = yv = 0;
//   array to store trail location of snake(current location of snake body)
trail = [];
// to storesize of snake
tail = 5;
// score
score = 0;
// high Score
high_score = 0;

// function to take input from keyboard arrow keys and reject input for going backwards
function keyPush(evt) {
  // left arrow
  if (evt.keyCode === 37 && xv === 0) {
    xv = -1;
    yv = 0;
  }
  // up arrow
  if (evt.keyCode === 38 && yv === 0) {
    xv = 0;
    yv = -1;
  }
  // right arrow
  if (evt.keyCode === 39 && xv === 0) {
    xv = 1;
    yv = 0;
  }
  // down arrow
  if (evt.keyCode === 40 && yv === 0) {
    xv = 0;
    yv = 1;
  }
}

// funtion to work the game
function game() {
  // moving the snake along the given keyboard input
  px += xv;
  py += yv;

  //wrapping the snake to come back from the opposite side after passing through one side
  if (px < 0) {
    px = tc - 1;
  }

  if (px > tc - 1) {
    px = 0;
  }

  if (py < 0) {
    py = tc - 1;
  }

  if (py > tc - 1) {
    py = 0;
  }

  //   fill/draw the canvas background black color
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  //   fill/draw the canvas location with apple/red color
  ctx.fillStyle = "red";
  ctx.fillRect(ax * gs, ay * gs, gs - 2, gs - 2);

  //   fill/draw the snake in the canvas
  ctx.fillStyle = "lime";
  //   fill the lime for the locations stored in the trail array
  for (var i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * gs, trail[i].y * gs, gs - 2, gs - 2);

    //   check if snake tangled itself to reset game
    if (trail[i].x === px && trail[i].y === py) {
      if (score > high_score) {
        high_score = score;
      }
      score = 0;
      tail = 5;
    }
  }

  //   push the locations of snake to pass on in trail array
  trail.push({ x: px, y: py });

  //   remove the locations passed over by the end of
  //   the snake(if array has more locations than size of
  //   snake the location first stored is removed)
  while (trail.length > tail) {
    trail.shift();
  }

  // check if snake ate the apple(passed over the apple location)
  if (ax === px && ay === py) {
    score += 1;
    //   snake grows by size 1 with each apple it eats
    tail++;
    //   new apple location is assigned
    ax = Math.floor(Math.random() * tc);
    ay = Math.floor(Math.random() * tc);
  }
  document.getElementById("score").innerHTML = score;
  document.getElementById("highScore").innerHTML = high_score;
}

/***************************************** THE END *************************************************** */
