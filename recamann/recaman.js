var arcs = [];
var count = 1;
var index = 0;
var biggest = 1;
var visited = [true];
var s;
var stepsize = 0;


function setup() {
    // put setup code here
    createCanvas(windowWidth,windowHeight);
    background(0);
    s = width;
    for(let i= 0; i<2;i++){
        step();
    }
    s = width/biggest;
}

function draw() {
    step();
    
    translate(0, 4*height/5);
    rotate(-PI/8);
    if (s > width/(biggest+biggest/40)) {
        s -= stepsize;
        background(0);
        scale(s);
        
        var i = 0;
        for(a of arcs) {
            //stroke(255);
            stroke(50,50,255*i++/count);
            a.show();
        }
    } else {
        scale(s);
        //stroke(255);
        arcs[arcs.length-1].show();
    }
}

function step() {
    var next = index - count;
    next = (next < 0 || visited[next]) ? index + count : next;
    
    var a = new Arc(index, next, count);
    arcs.push(a);
    
    if (biggest < next) {
        biggest = next;
        stepsize = max(0,(s - width/biggest)/5);
    }
    count++;
    var result = false;
    if (next < index) {
        result = true;
    }
    index = next;
    visited[index] = true;
    return result;
    
}



class Arc {
    constructor(start, end, dir) {
        this.start = start;
        this.end = end;
        this.dir = dir;
    }
    
    show() {
        var diameter = abs(this.start-this.end);
        noFill();
        arc((this.start+this.end)/2, 0, diameter, diameter, PI*(this.dir%2), PI* ((this.dir%2)-1))
    }
}
