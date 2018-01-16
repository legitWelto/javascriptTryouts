var angle;

function setup() {
  // put setup code here
  createCanvas(400,400);
  slider = createSlider(0,PI,PI/4, 0.01);
}

function draw() {
  // put drawing code here
  background(51);
  angle = slider.value();
  stroke(255);
  translate(width/2,height);
  branch(100);
}

function branch(len) {
  line(0,0,0,-len);
  translate(0,-len);
  push()
  rotate(angle);
  if (len > 2) {
    branch(len*0.7);
  }
  pop()
  rotate(-angle);
  if (len > 2) {
    branch(len*0.7);
  }
}