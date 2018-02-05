var showbox;
var ti;

function setup(){
    createCanvas(400,450);
    showbox = 400;
    textSize(32);
}

function draw(){
}

class Tournament {
    constructor() {
        this.players = new Array(6);
        for (var i = 0; i < this.players.length; i++) {
            this.players[i] = new NeuralNet(3);
            this.players[i].randomize();
        }
    }
    
    roundrobin(){
        drawTopMatches();
        getScore();
        this.players.sort(this.compare);
        var newPlayers = new Array(this.players.length);
        for (var i = 0; i < this.players.length/3; i++) {
            // todo change param with score
            newPlayers[3*i] = this.players[i].mutate(0.1,0.1);
            newPlayers[3*i+1] = this.players[i].mutate(0.25,0.25);
            newPlayers[3*i+2] = this.players[i].mutate(0.1,0.5);
        }
        this.players = newPlayers;
    }

    drawTopMatches(){
        background(255);
        var k,l;
        for (var i = 1; i < 3; i++) {
            for (var j = 0; j < 2; j++) {
                var turn = true;
                var game = new TicTacToe();
                if (j==0){
                    k=0;
                    l=i;
                } else {
                    k= i;
                    l = 0;
                }
                while (game.state == 'ongoing'){
                    if (turn) {
                        game.move(this.players[k].pass(game.board),'circle');
                    } else {
                        game.move(this.players[l].pass(game.board),'cross');
                    }
                    turn = !turn;
                }
                game.show((i-1)*showbox,j*showbox);
                switch(game.state){
                    case 'draw':
                        text("Draw");
                        break;
                    case 'circle':
                        text("Player "+ k +" won");
                        break;
                    case 'cross':
                        text("Player "+ l +" won");
                        break;
                }
            }
        }
    }

    getScore() {
        for (var i = 0; i < this.players.length; i++) {
            for (var j = 0; j < i; j++) {
                var turn = true;
                var game = new TicTacToe();
                while (game.state == 'ongoing'){
                    if (turn) {
                        game.move(this.players[i].pass(game.board),'circle');
                    } else {
                        game.move(this.players[j].pass(game.board),'cross');
                    }
                    turn = !turn;
                }
                switch(game.state){
                    case 'draw':
                        this.players[i].score += 0.5;
                        this.players[j].score += 0.5;
                        break;
                    case 'circle':
                        this.players[i].score++;
                        break;
                    case 'cross':
                        this.players[j].score++;
                        break;
                }
            }
            for (var j = i+1; j < this.players.length; j++) {
                var turn = true;
                var game = new TicTacToe();
                while (game.state == 'ongoing'){
                    if (turn) {
                        game.move(this.players[i].pass(game.board),'circle');
                    } else {
                        game.move(this.players[j].pass(game.board),'cross');
                    }
                    turn = !turn;
                }
                switch(game.state){
                    case 'draw':
                        this.players[i].score += 0.5;
                        this.players[j].score += 0.5;
                        break;
                    case 'circle':
                        this.players[i].score++;
                        break;
                    case 'cross':
                        this.players[j].score++;
                        break;
                }
            }
        }
    }
        
        
    compare (a,b) {
        return(a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0);
    }
}

class NeuralNet {
    constructor(hiddenlayers){
        this.matrix = new Array(hiddenlayers);
        for (var i = 0; i < this.matrix.length; i++) {
            this.matrix[i] = new Array(9);
            for (var j = 0; j < 9; j++) {
                this.matrix[i][j] = new Array(10);
            }
        }
        this.score = 0;
    }

    randomize(){
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < 9; j++) {
                for (var k = 0; k < 10; k++) {
                this.matrix[i][j][k] = Math.random()*2-1;
            }
        }
    }

    mutate(many,much){
        // many = 1 means all random many= 0 none
        // much = 1 completely new entry much =0 sam entry as before
        var newNet = new NeuralNet(matrix.length);
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < 9; j++) {
                for (var k = 0; k < 10; k++) {
                    if  (many > Math.random) {
                        newNet.matrix[i][j][k] = (1-much)*this.matrix[i][j][k] + much * (Math.random()*2-1);
                    } else {
                        newNet.matrix[i][j][k] = this.matrix[i][j][k];
                    }
                }
            }
        }
        return newNet;
    }

    pass(board){
        var tempNodes = new Array(9);
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < 9; j++) {
                // const factor
                tempNodes[j] = this.matrix[i][j][9];
                for (var k = 0; k < 9; k++) {
                    tempNodes[j] += newNet.matrix[i][j][k]*board[k];
                }
            }
            for (var j = 0; j < 9; j++) {
                // activation
                board[j] = (tempNodes[j] > 0) ? tempNodes[j] : 0;
            }
        }
        //get pos with maximum
        var pos = 0;
        for (var j = 1; j < 9; j++) {
             if (board[j] > board[pos]) pos = j;
        }
        return pos;
    }

    // todo save load...
}

class TicTacToe {
    constructor(){
        this.board=[0,0,0,0,0,0,0,0,0];
        this.state = 'ongoing';
    }

    show(x,y){
        //vertical lines
        line(x+showbox/3,y,x+showbox/3,y+showbox);
        line(x+2*showbox/3,y,x+2*showbox/3,y+showbox);
        //horizontal lines
        line(x,y+showbox/3,x+showbox,y+showbox/3);
        line(x,y+2*showbox/3,x+showbox,y+2*showbox/3);
        for (var i= 0; i< 3; i++) {
            for (var j= 0; j< 3;  j++){
                if(this.board[3*i+j]== 1) {
                    ellipse(x+i*showbox/3 +showbox/6,y+j*showbox/3 +showbox/6, showbox/3);
                } else if(this.board[3*i+j]== -1) {
                    line(x+i*showbox/3,y+j*showbox/3,x+(i+1)*showbox/3,y+(j+1)*showbox/3);
                    line(x+i*showbox/3,y+(j+1)*showbox/3,x+(i+1)*showbox/3,y+j*showbox/3);
                }
            }
        }
    }

    move(pos,player){
        if (this.board[pos] != 0) {
            this.state = (player=='circle')?'cross' : 'circle';
            return true;
        }
        var sum;
        if (player== 'circle') {
            this.board[pos] = 1;
            this.state =='circle';
            sum = 3;
        } else {
            this.board[pos] = -1;
            this.state =='cross';
            sum = -3;
        }
        switch (pos) {
            case 0:
                if (this.board[0] + this.board[1] + this.board[2] == sum ||
                    this.board[0] + this.board[3] + this.board[6] == sum ||
                    this.board[0] + this.board[4] + this.board[8] == sum){
                        return true;
                    }
                    break;
            case 1:
                if (this.board[0] + this.board[1] + this.board[2] == sum ||
                    this.board[1] + this.board[4] + this.board[7] == sum ){
                        return true;
                    }
                    break;
            case 2:
                if (this.board[0] + this.board[1] + this.board[2] == sum ||
                    this.board[2] + this.board[4] + this.board[6] == sum ||
                    this.board[2] + this.board[5] + this.board[8] == sum ){
                        return true;
                    }
                    break;
            case 3:
                if (this.board[0] + this.board[3] + this.board[6] == sum ||
                    this.board[3] + this.board[4] + this.board[5] == sum){
                        return true;
                    }
                    break;
            case 4:
                if (this.board[0] + this.board[4] + this.board[8] == sum ||
                    this.board[1] + this.board[4] + this.board[7] == sum ||
                    this.board[2] + this.board[4] + this.board[6] == sum ||
                    this.board[3] + this.board[4] + this.board[5] == sum ){
                        return true;
                    }
                    break;
            case 5:
                if (this.board[3] + this.board[4] + this.board[5] == sum ||
                    this.board[2] + this.board[5] + this.board[8] == sum ){
                        return true;
                    }
                    break;
            case 6:
                if (this.board[0] + this.board[3] + this.board[6] == sum ||
                    this.board[2] + this.board[4] + this.board[6] == sum ||
                    this.board[6] + this.board[7] + this.board[8] == sum){
                        return true;
                    }
                    break;
            case 7:
                if (this.board[1] + this.board[4] + this.board[7] == sum ||
                    this.board[8] + this.board[6] + this.board[7] == sum ){
                        return true;
                    }
                    break;
            case 8:
                if (this.board[2] + this.board[5] + this.board[8] == sum ||
                    this.board[0] + this.board[4] + this.board[8] == sum ||
                    this.board[2] + this.board[5] + this.board[8] == sum ){
                        return true;
                    }
                    break;
        }
        if (this.board[0] != 0 && this.board[1] != 0 && this.board[2] != 0 && this.board[3] != 0 && 
            this.board[4] != 0 && this.board[5] != 0 && this.board[6] != 0 && this.board[7] != 0 && 
            this.board[8] != 0){
                this.state = 'draw';
                return true;
        }
        this.state = 'ongoing';
        return true;
    }
}