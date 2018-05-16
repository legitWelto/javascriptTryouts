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
var p;


function setup(){
    createCanvas(650,450);
    showbox = 200;
    textSize(32);
    tournament = new Tournament();
    but = createButton("trainAI");
    but.position(0,450);
    but.mousePressed(next);
    but2 = createButton("perfectPlayer");
    but2.position(200,450);
    but2.mousePressed(test);
    but3 = createButton("evaluate");
    but3.position(300,450);
    but3.mousePressed(eva);
    count = 0;
    p = new classicPlayer();
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
    background(255);
    gam.show(0,0);
    turnMain = 0;
}

function eva(){
    if (test && !runs){
        if (turnMain % 2 == 0) {
            move_happend = gam.move(p.evaluate(gam.board,'circle'),'circle');
        } else {
            move_happend = gam.move(p.evaluate(gam.board,'cross'),'cross');
        }
        if (move_happend) {turnMain+=1;}
        background(255);
        gam.show(0,0);
        switch (gam.state){
            case 'draw':
                text("Draw",0,showbox*0.5);
                break;
            case 'circle':
                text("Circle won",0,showbox*0.5);
                break;
            case 'cross':
                text("Cross won", 0,showbox*0.5);
                break;
        }
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
            gam.move(3*i+j,'circle')
        } else {
            gam.move(3*i+j,'cross')
        }
        turnMain += 1;
        background(255);
        gam.show(0,0);
        switch (gam.state){
            case 'draw':
                text("Draw",0,showbox*0.5);
                break;
            case 'circle':
                text("Circle won",0,showbox*0.5);
                break;
            case 'cross':
                text("Cross won", 0,showbox*0.5);
                break;
        }
    }
}

function draw(){
    if (runs){
        showbox =200;
        tournament.roundrobin();
    }
}
