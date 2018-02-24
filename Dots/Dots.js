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
var inp;
var trys;
var guessAngle;
var guessRadius;
var maxTries;

// only works on omnibus server because of coars
// gif supports .pause() .play()

function setup() {
  createCanvas(400,400);
  gif = loadGif('acc/earth.gif');
  inp = createInput('');
  inp.position(0 , height + 10);
  butt = createButton('submit');
  butt.position(200, height+10);
  butt.mousePressed(submitGuess);
  trys = 0;
}

function draw() {
  image(gif, 0, 0);
}

function submitGuess() {
  guess = inp.value();
  gif.pause();
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
}