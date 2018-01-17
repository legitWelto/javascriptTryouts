function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid1;
let grid2;
let turn2 = false;
let cols;
let rows;
let boxLength = 10;
var runs = false;

function setup() {
    
    createCanvas(400,400);
    var go = createButton("start");
    go.mousePressed(startstop);
    rows = height/boxLength;
    cols = width/boxLength;
    grid1 = make2DArray(cols + 2, rows + 2);
    grid2 = make2DArray(cols + 2, rows + 2);
    for (let i = 0; i < cols + 2; i++) {
        for (let j = 0; j < rows + 2; j++) {
            if (j==0||i==0||j==rows+1||i==cols+1) {
                grid1[i][j] = 0;
                grid2[i][j] = 0;
            } else {
                grid1[i][j] = floor(random(2));
            }
        }
    }
    console.table(grid1);
}

function mousePressed() {
    var i = ceil(mouseX / boxLength);
    var j = ceil(mouseY / boxLength)
    if (!runs && i < grid1.length && j < grid1[1].length){
        grid1[i][j] = (grid1[i][j] + 1) % 2;
        grid2[i][j] = (grid2[i][j] + 1) % 2;
    }
}

function startstop() {
    runs = !runs;
}

function draw() {
    background(0);
    if (turn2) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if(grid2[i+1][j+1] == 1) {
                    fill(255);
                    rect(i*boxLength ,j*boxLength ,boxLength-1, boxLength-1);
                }
            }
        }
    } else {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (grid1[i+1][j+1] == 1) {
                    fill(255);
                    rect(i*boxLength ,j*boxLength ,boxLength-1, boxLength-1);
                }
            }
        }
    }
    if (runs) {
        nextGrid();
        turn2 = !turn2;
    }
}

function nextGrid() {
    if (!turn2) {
        for (let i = 1; i < cols + 1; i++) {
            for (let j = 1; j < rows + 1; j++) {
                let neighbors = 0;
                for (let x = -1; x < 2; x++) {
                    for (let y = -1; y < 2; y++) {
                        neighbors += grid1[i+x][y+j];
                    }
                }
                neighbors -= grid1[i][j];
                let state = grid1[i][j];
                if (state == 0 && neighbors == 3) {
                    
                    grid2[i][j] = 1;
                } else {
                    if(state == 1 && (neighbors <2 ||neighbors > 3)) {
                        grid2[i][j] = 0;
                    } else {
                        grid2[i][j] = state;
                    }
                }
            }
        }
        return;
    }
    for (let i = 1; i < cols + 1; i++) {
        for (let j = 1; j < rows + 1; j++) {
            let neighbors = 0;
            for (let x = -1; x < 2; x++) {
                for (let y = -1; y < 2; y++) {
                    neighbors += grid2[i+x][y+j];
                }
            }
            neighbors -= grid2[i][j];
            if (grid2[i][j] == 0 && neighbors == 3) {
                grid1[i][j] = 1;
            } else if(grid2[i][j] == 1 && (neighbors <2 ||neighbors > 3)) {
                grid1[i][j] = 0;
            } else {
                grid1[i][j] = grid2[i][j];
            }
        }
    }
}