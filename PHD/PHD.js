var runs = false;
var slider1;
var slider2;
var t;
var boxlength;
var button1;
var button2;
var Particles = [];

function setup() {
    createCanvas(650,650, WEBGL);
    button1 = createButton("start/stop");
    button1.mousePressed(startstop);
    button1.position(0,625);
    button2 = createButton("create particle");
    button2.mousePressed(createParticle);
    button2.position(100,625);
    slider1 = createSlider(-PI/2,0,-PI/4,0);
    slider1.position(0,600);
    slider1.style('width','600px');
    slider2 = createSlider(-PI/16,PI/4,0,0);
    slider2.style('rotate', 90);
    slider2.position(300,300);
    slider2.style('width','600px');
    t = 0.1;
    boxlength = 200;
}

function createParticle() {
    Particles.push(new Particle(50,50,50,10,10,10,50));
}

function startstop() {
    runs = !runs;
}
function draw() {
    background(255);
    rotateX(-slider2.value());
    rotateY(slider1.value());
    translate(0,-100,0);
    drawBox(boxlength);
    for (var num in Particles) {
        Particles[num].show();
    }
    if (runs) {
        for (var num in Particles) {
            Particles[num].updatePosition();
            if (Particles[num].y > boxlength) {
                Particles.splice(num,1);
                continue;
            }
            Particles[num].updateVelocity();
        }
    }
}

function drawBox(x){
    strokeWeight(2);
    stroke(0);
    line(0,0,0,0,0,x);
    line(0,0,0,0,x,0);
    line(0,0,0,x,0,0);
    line(0,0,x,0,x,x);
    line(0,x,0,0,x,x);
    line(x,x,x,0,x,x);
    line(x,x,0,x,x,x);
    line(x,x,0,x,0,0);
    line(x,x,0,0,x,0);
}

class Particle {
    constructor(x,y,z,vx,vy,vz,m) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.vx = vx;
        this.vy = vy;
        this.vz = vz;
        this.m = m;
        this.neigbor = [];
    }
    
    findNeigbors() {
        var findings = [];
        for (var num in Particles) {
            if (this.dist(Particles[num]) < 50) {
                if (Particles[num] != this) {
                    findings.push(Particles[num]);
                }
            }
        }
        return findings;
    }
    updatePosition() {
        this.x += this.vx *t;
        this.y += -this.vy *t;
        this.z += this.vz *t;
    }
    
    updateVelocity() {
        this.neigbor = this.findNeigbors();
        //todo: compute density/pressure pressuracc and viscosity acc
        //gravity
        this.vy -= 9.81*t; 
    }
    
    dist(particle) {
        return sqrt((particle.x - this.x)*(particle.x - this.x) +
                    (particle.y - this.y)*(particle.y - this.y) +
                    (particle.z - this.z)*(particle.z - this.z));
    }
    
    show() {
        // 3d perimitives dont work on current p5
        //push();
        //translate(this.x,boxlength -this.y, this.z);
        strokeWeight(4);
        stroke(0,0,255);
        line(this.x-10,this.y,this.z,this.x+10,this.y,this.z);
        line(this.x,this.y+10,this.z,this.x,this.y-10,this.z);
        line(this.x,this.y,this.z+10,this.x,this.y,this.z-10);
        //box(20)
        //pop();
    }
}
