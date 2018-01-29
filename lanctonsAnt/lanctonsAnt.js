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
let boxLength = 40;
var runs = false;
var steps;
var instructions = [0, 1,1,1,0]

function setup() {
    
    createCanvas(600,650);
    // reserve lower 50pix for text
    rows = (height - 50)/boxLength;
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
    steps = 0;
    textSize(32);
}

function mousePressed() {
    if (mouseY < height && mouseY > height - 50 && mouseX < 120 && mouseX > 0) {
        runs = !runs;
    }
    var i = floor(mouseX / boxLength);
    var j = floor(mouseY / boxLength);
    if (!runs && i < cols && i >= 0 && j<rows && j >= 0){
        antx = i;
        anty = j;
    }
}

function draw() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j]) {
                fill(255 * grid[i][j]/(instructions.length - 1));
                rect(i*boxLength ,j*boxLength ,boxLength, boxLength);
            }
        }
    }
    if (boxLength > 15) {
        noStroke();
        fill(255,0,0);
        rect((antx+0.3)*boxLength,(anty+0.3)*boxLength ,0.3*boxLength, 0.3*boxLength);
    }
    fill(255);
    rect(0, height - 50, width, 50);
    fill(0);
    if (runs) {
        steps += 1;
        antStep();
        text("Stop", 20, height - 10)
    } else {
        text("Start", 20, height - 10)
        for (var k = 0; k < instructions.length; k++) {
            i = k % 6
            // todo: when more than 6 make more than one row of exampletiles
            t = ceil(instructions.length / 6) - floor(k/6) - 1;
            fill(255 * k/(instructions.length - 1));
            rect(300 + i * 50, height - 50 - t *50 ,50, 50);
            fill(255 * (1-floor(2*k/(instructions.length-1))));
            if (instructions[k]) {
                text("L", 315 + i * 50, height - 10 - t *50);
            } else {
                text("R", 315 + i * 50, height - 10 - t *50);
            }
        }
        text("Steps: "+steps, 120, height - 10)
    }
}

function antStep() {
    go(instructions[grid[antx][anty]]);
    grid[antx][anty] = (grid[antx][anty] + 1) % instructions.length;
    antx += dirx;
    anty += diry;
    if (antx < 0 || anty < 0 || antx > cols - 1 || anty > rows - 1) {
        refineGrid();
    }
}

function go(direction) {
    // direction 1 for right 0 for left
    var temp = dirx;
    if (!direction) {
        dirx = -diry;
        diry = temp;
    } else {
        dirx = diry;
        diry = -temp;
    }
}

function refineGrid() {
    boxLength = floor(boxLength/3);
    var newGrid = make2DArray(cols * 3, rows * 3);
    for (var i = 0; i < 3*cols; i++) {
        for (var j = 0; j < 3* rows; j++) {
            newGrid[i][j] = 0;
        }
    }
    for (var i = cols; i < 2*cols; i++) {
        for (var j = rows; j < 2* rows; j++) {
            newGrid[i][j] = grid[i-cols][j-rows];
        }
    }
    antx += cols;
    anty += rows;
    cols = 3*cols;
    rows = 3*rows;
    grid = newGrid;
}
