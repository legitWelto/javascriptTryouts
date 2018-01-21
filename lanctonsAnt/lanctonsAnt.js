function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
var antx;
var anty;
var dirx;
var diry;
let boxLength = 10;
var runs = false;

function setup() {
    
    createCanvas(1000,1000);
    var go = createButton("start");
    go.mousePressed(startstop);
    rows = height/boxLength;
    cols = width/boxLength;
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = 0;
        }
    }
    antx = floor(cols/2);
    anty = floor(rows/2);
    diry = -1;
    dirx = 0;
}

function mousePressed() {
    var i = floor(mouseX / boxLength);
    var j = floor(mouseY / boxLength)
    if (!runs && i < cols && i > 0 && j<rows && j > 0){
        antx = i;
        anty = j;
    }
}

function startstop() {
    runs = !runs;
}

function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if(grid[i][j] == 1) {
                fill(255);
                rect(i*boxLength ,j*boxLength ,boxLength, boxLength);
            }
        }
    }
    noStroke();
    fill(255,0,0);
    rect((antx+0.3)*boxLength,(anty+0.3)*boxLength ,0.3*boxLength, 0.3*boxLength);
    if (runs) {
        antStep();
    }
}

function antStep() {
    var temp = dirx;
    if (grid[antx][anty]){
        dirx = -diry;
        diry = temp;
    } else {
        dirx = diry;
        diry = -temp;
    }
    grid[antx][anty] = (grid[antx][anty] + 1) % 2;
    antx += dirx;
    anty += diry;
}