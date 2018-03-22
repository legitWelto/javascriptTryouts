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
var instructionFlag;
let boxLength;
var runs;
var steps;
var instructions;

function setup() {
    
    createCanvas(600,650);
    // reserve lower 50pix for text
    instructions = [0, 1];
    reset();
}
function reset() {
    boxLength = 40;
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
    instructionFlag = false;
    runs = false;
    textSize(32);
    background(0);
}

function mousePressed() {
    if (instructionFlag) {
        var i = floor(mouseX / 100);
        var j = floor(mouseY / 100);
        if (i + 6 * j < instructions.length) {
            instructions[i + 6 * j] = (instructions[i + 6 * j] + 1) %2;
        }
        if (mouseY < height && mouseY > height - 50 && mouseX < 120 && mouseX > 0) {
            instructions.push(0);
        }
        if (mouseY < height && mouseY > height - 50 && mouseX < 200 && mouseX > 120) {
            instructions.pop();
        }
        if (mouseY < height && mouseY > height - 50 && mouseX < width 
            && mouseX > width-90 && !runs) {
            instructionFlag = !instructionFlag;
            redrawGrid();
        }
        
    } else {
        if (mouseY < height && mouseY > height - 50 && mouseX < 120 && mouseX > 0) {
            runs = !runs;
        }
        if (runs && mouseY < height && mouseY > height - 50 && mouseX < 200 && mouseX > 120) {
            reset();
        }
        if (mouseY < height && mouseY > height - 50 && mouseX < width 
            && mouseX > width-170 && !runs) {
            instructionFlag = !instructionFlag;
        }
        var i = floor(mouseX / boxLength);
        var j = floor(mouseY / boxLength);
        if (!runs && i < cols && i >= 0 && j<rows && j >= 0){
            antx = i;
            anty = j;
        }
    }
}

function draw() {
    if (instructionFlag) {
        background(0);
        fill(255);
        rect(0, height - 50, width, 50);
        for (var k = 0; k < instructions.length; k++) {
            i = k % 6
            t = (k - i) / 6;
            fill(255 * k/(instructions.length - 1));
            rect(i * 100, t *100 ,100, 100);
            fill(255 * (1-floor(2*k/(instructions.length-1))));
            push();
            textSize(64);
            if (instructions[k]) {
                text("L", 30 + i * 100, 70 + t * 100);
            } else {
                text("R", 30 + i * 100, 70 + t * 100);
            }
            pop();
            fill(0);
            text("Add", 20, height - 10);
            text("Delete", 120, height - 10);
            text("Enter", width-90, height - 10);
        }
        return 0;
    }
    fill(255);
    rect(0, height - 50, width, 50);
    if (runs) {
        steps += 1;
        antStep();
        fill(0);
        text("Stop", 20, height - 10)
        text("Reset", 120, height - 10)
        if (boxLength > 7) {
            noStroke();
            fill(255,0,0);
            rect((antx+0.3)*boxLength,(anty+0.3)*boxLength ,0.3*boxLength, 0.3*boxLength);
        }
    } else {
        fill(0);
        text("Start", 20, height - 10);
        text("Steps: "+steps, 120, height - 10);
        text("Instructions", width-170, height - 10);
    }
}

function antStep() {
    go(instructions[grid[antx][anty]]);
    grid[antx][anty] = (grid[antx][anty] + 1) % instructions.length;
    // draw changed tile
    fill(255 * grid[antx][anty]/(instructions.length - 1));
    rect(antx*boxLength ,anty*boxLength ,boxLength, boxLength);
    antx += dirx;
    anty += diry;
    if (antx < 0 || anty < 0 || antx > cols - 1 || anty > rows - 1) {
        refineGrid();
        redrawGrid();
    }
}

function redrawGrid() {
    background(0);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (grid[i][j]) {
                fill(255 * grid[i][j]/(instructions.length - 1));
                rect(i*boxLength ,j*boxLength ,boxLength, boxLength);
            }
        }
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
