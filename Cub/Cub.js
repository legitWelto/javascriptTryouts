var runs = false;
var slider1;
var slider2;

function setup() {
    createCanvas(650,650, WEBGL);
    textSize(32);
    slider1 = createSlider(-PI,PI,0,0);
    slider1.position(0,600);
    slider1.style('width','600px');
    slider2 = createSlider(-PI,PI,0,0);
    slider2.style('rotate', 90);
    slider2.position(300,300);
    slider2.style('width','600px');
}


function draw() {
    background(255);
    rotateX(slider1.value());
    rotateY(slider2.value());
    box(200);
    box(50);
}