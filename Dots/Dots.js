/*
* author: Welto
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
var instru;
var butInst;

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
  butInst = createButton('Instruction');
  butInst.position(340, height- 40);
  butInst.mousePressed(instructions);
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
  if (instru) return 0;
  image(gif, 0, 0);
}

function instructions() {
  instru = true;
  background(255);
  text("There are two identical sets of dots to the left and to the right\nwith the exception of exactly one dot.\nLocate that dot (Hint: use cross or parallel view).\nEnter a number from one to twelve corresponding to\nthe clocktime you suspect the extra dot in,\nfollowed bye a small letter \'a\' for outer most ring\'b\' for middle and\n\'c\' for inner ring.\nPress submit to enter your guess.\nPress new riddle to get a fresh set of points.\nCan you guess the right position in only 3 tries?",20,40);
}
function setGif() {
  trys = 0;
  instru = false;
  solved = false;
  num = ceil(random(0.00001, Object.keys(data).length));
  gif = loadGif(data[num].gif);
  fill(255);
  rect(430, height - 100, 370, 50);
  fill(0);
  text(maxTries - trys + " tr" +((maxTries - trys == 1)? "y" : "ies")+ " left", 430, height- 60);
}

function submitGuess() {
  if (solved || instru) { return 0;}
  guess = inp.value();
  console.log('your Guess: ',guess);
  if (guess.length > 3 || guess.length < 2) {
    console.log('your Guess has invalid length');
    return 0;
  }
  if(guess.length == 2){
    guessAngle = guess[0];
    guessRadius = guess[1];
  } else{
    guessAngle = guess[0] + guess[1];
    guessRadius = guess[2];
  }
  inp.value("");

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
      return 0;
  }
  fill(255);
  rect(430, height - 100, 370, 50);
  fill(0);
  if (solution) {
    gif = loadImage(data[num].img);
    solved = true;
    text('you guessed right', 430, height - 60);
    return 0;
  }
  trys += 1;
  if (trys == maxTries) {
    gif = loadImage(data[num].img);
    solved = true;
    text('you ran out of tries',  430, height - 60);
    return 0;
  }
  text(maxTries - trys + " tr" + ((maxTries - trys == 1)? "y" : "ies")+ " left",  430, height -60);
}