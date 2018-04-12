/*
* athor: Welto
* display random gif from folder
* > Load JSON with [id:[.gif, solution.img, solution.angle, solution.radius], ...]
* > chose random id from JSON
* > play gif from id until the write guess was submited or try >= maxTries
* > display solution.img
* > reset after pressing button
*/

var gif;
var butt;
var renew;
var inp;
var trys;
var guessAngle;
var guessRadius;
var radiusTolerance;
var angleTolerance;
var maxTries;
var data;
var num;
var solved;

// only works on omnibus server because of coars
// loadJSON only works on omnibus
// gif supports .pause() .play()
function preload() {
  data = loadJSON('data.json');
}

function setup() {
  createCanvas(800,500);
  inp = createInput('');
  inp.position(0 , height - 90);
  butt = createButton('submit your guess');
  butt.position(200, height- 90);
  butt.mousePressed(submitGuess);
  renew = createButton('new riddle');
  renew.position(340, height - 90);
  renew.mousePressed(setGif);
  radiusTolerance = 0.05;
  angleTolerance = 0.05;
  maxTries = 3;
  textSize(25);
  noStroke();
  setGif();
}

function draw() {
  image(gif, 0, 0);
}

function setGif() {
  trys = 0;
  solved = false;
  num = ceil(random(0.00001, Object.keys(data).length));
  console.log(num);
  gif = loadGif(data[num].gif);
  fill(255);
  rect(430, height - 100, 370, 50);
  fill(0);
  console.log(maxTries + " " + trys);
  text(maxTries - trys + " tries left",  430, height- 60);
}

function submitGuess() {
  if (solved) { return 0;}
  guess = inp.value();
  console.log('your Guess: ',guess);
  if (guess.length > 3 || guess.length < 2) {
    console.log('your Guess has invalid length');
    return;
  }
  if(guess.length == 2){
    guessAngle = guess[0];
    guessRadius = guess[1];
    console.log('your guessed angle: ',  guessAngle);
    console.log('your guessed radius: ',  guessRadius);
  } else{
    guessAngle = guess[0] + guess[1];
    guessRadius = guess[2];
    console.log('your guessed angle: ',  guessAngle);
    console.log('your guessed radius: ',  guessRadius);
  }

  var solution = true;
  if (abs(guessAngle - data[num].angle/30)%12 > 0.5 + angleTolerance) {
    solution = false;
  }
  switch (guessRadius) {
    case 'a':
      if (data[num].radius < 0.6 - radiusTolerance) {
        solution = false;
      }
      break;
    case 'b':
      if (data[num].radius > 0.6 + radiusTolerance || data[num].radius < 0.3 - radiusTolerance) {
        solution = false;
      }
      break;
    case 'c':
      if (data[num].radius > 0.3 + radiusTolerance) {
        solution = false;
      }
      break;
    default:
      // letter doesnt applies to rules
      console.log('your guessed radius has to be in a-c');
      solution = false;
  }
  fill(255);
  rect(430, height - 100, 370, 50);
  fill(0);
  if (solution) {
    console.log('you guessed right');
    gif = loadImage(data[num].img);
    solved = true;
    text('you guessed right', 430, height - 60);
    return 0;
  }
  trys += 1;
  if (trys == maxTries) {
    console.log('you ran out of tries');
    gif = loadImage(data[num].img);
    solved = true;
    text('you ran out of tries',  430, height - 60);
    return 0;
  }
  text(maxTries - trys + " tries left",  430, height -60);
}