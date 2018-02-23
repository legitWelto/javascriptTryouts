var angle;
var balance;
var rando;

function setup() {
  // put setup code here
  createCanvas(600,500);
  slider = createSlider(0,PI,PI/4, 0);
  slider.position(0,height + 10);
  slider.style('width','600px');
  slider2 = createSlider(-PI,PI,0, 0);
  slider2.position(0,height + 30);
  slider2.style('width','600px');
  slider3 = createSlider(0,1,0, 0);
  slider3.position(0,height + 50);
  slider3.style('width','600px');
}

function draw() {
  if (angle != slider.value() || balance != slider2.value() || rando != slider3.value()) {
      background(51);
      angle = slider.value();
      balance = slider2.value();
      rando = slider3.value();
      stroke(255);
      translate(width/2,height);
      branch(100);
  }
}

function branch(len) {
  line(0,0,0,-len);
  translate(0,-len);
  push()
  var offset = (Math.random() * PI/2 - PI/4) *rando;
  rotate(angle+balance+ offset);
  if (len > 2) {
    branch(len*0.7);
  }
  pop()
  offset = (Math.random() * PI/2 - PI/4) *rando;
  rotate(-angle+balance+offset);
  if (len > 2) {
    branch(len*0.7);
  }
}