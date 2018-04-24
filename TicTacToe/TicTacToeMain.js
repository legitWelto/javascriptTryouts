// Copyright Welto
// programm initialises tornament in which NN will battle
// Task seems to complicated. after some iterations NN are to similare and do all the same moves so evryone wins exatly the games he started or 
// did go secound because the other does a nonvalid move. Maybe there shoudle be a training for cross and one for circle

var showbox;
var tournament;
var but;
var but2;
var but3;
var runs;
var gam;
var turn;
var move_happend;


function setup(){
    createCanvas(650,450);
    showbox = 200;
    textSize(32);
    tournament = new Tournament();
    but = createButton("naechste Runde");
    but.position(0,450);
    but.mousePressed(next);
    but2 = createButton("Test");
    but2.position(200,450);
    but2.mousePressed(test);
    but3 = createButton("evaluate");
    but3.position(300,450);
    but3.mousePressed(eva);
    count = 0;
    runs = false;
    test = false;
}

function next(){
    runs = !runs;
    test = false;
}

function test(){
    test = true;
    showbox = 400;
    gam = new TicTacToe;
    gam.show(0,0);
    turnMain = 0;
}

function eva(){
    if (test && !runs){
        if (turnMain % 2 == 0) {
            move_happend = gam.move(tournament.circle[0].evaluate(gam.board),'circle');
        } else {
            move_happend = gam.move(tournament.cross[0].evaluate(gam.board),'cross');
        }
        if (move_happend) {turnMain+=1;}
    }
}

function mousePressed() {
    if (test && !runs) {
        if (mouseX > 400 || mouseY >400) { return;}
        var i = floor(3*mouseX / showbox);
        var j = floor(3*mouseY / showbox);
        if (gam.board[3*i+j] != 0) {
            return;
        }
        if (turnMain % 2 == 0) {
            gam.board[3*i+j] = 1;
        } else {
            gam.board[3*i+j] = -1;
        }
        turnMain += 1;
    }
}

function draw(){
    if (runs){
        showbox =200;
        tournament.roundrobin();
    } else if (test) {
        background(255);
        gam.show(0,0);
    }
}
