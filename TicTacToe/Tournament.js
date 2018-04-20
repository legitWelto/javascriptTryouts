class Tournament {
    constructor() {
        this.players = new Array(300);
        for (var i = 0; i < this.players.length; i++) {
            this.players[i] = new NeuralNet(3);
            this.players[i].randomize();
        }
    }
    
    roundrobin(){
        this.drawTopMatches();
        this.getScore();
        this.players.sort(this.compare);
        var newPlayers = new Array(this.players.length);
        text("Score",400, 50)
        text("player #0: " + this.players[0].score, 400, 100);
        text("player #1: " +this.players[1].score, 400, 150);
        text("player #2: " + this.players[2].score, 400, 200);
        for (var i = 0; i < this.players.length/6; i++) {
            // todo change param with score
            newPlayers[6*i] = this.players[i].mutate(0,0);
            newPlayers[6*i+1] = this.players[i].mutate(0.5,0.5);
            newPlayers[6*i+2] = this.players[i].mutate(0.7,0.25);
            newPlayers[6*i+3] = this.players[i].mutate(0.25,0.25);
            newPlayers[6*i+4] = this.players[i].mutate(0.1,0.1);
            newPlayers[6*i+5] = this.players[i].mutate(1,1);
            newPlayers[6*i+5].randomize();
        }
        this.players = newPlayers;
    }

    drawTopMatches(){
        background(255);
        var k,l,game,turn;
        for (var i = 1; i < 3; i++) {
            for (var j = 0; j < 2; j++) {
                turn = true;
                game = new TicTacToe();
                if (j==0){
                    k=0;
                    l=i;
                } else {
                    k= i;
                    l = 0;
                }
                while (game.state == 'ongoing') {
                    if (turn) {
                        game.move(this.players[k].pass(game.board),'circle');
                    } else {
                        game.move(this.players[l].pass(game.board),'cross');
                    }
                    turn = !turn;
                }
                game.show((i-1)*(showbox+5),j*(showbox+5));
                switch (game.state){
                    case 'draw':
                        text("Draw",(i-1)*showbox,j*showbox+showbox*0.5);
                        break;
                    case 'circle':
                        text("Player "+ k +" won",(i-1)*showbox,j*showbox+showbox*0.5);
                        break;
                    case 'cross':
                        text("Player "+ l +" won", (i-1)*showbox,j*showbox+showbox*0.5);
                        break;
                }
            }
        }
        text("Round #" + ++count, 0, 425);
    }

    getScore() {
        var turn,miss,game;
        var misspen = 2;
        for (var i = 0; i < this.players.length; i++) {
            for (var j = 0; j < i; j++) {
                turn = true;
                game = new TicTacToe();
                while (game.state == 'ongoing'){
                    if (turn) {
                        miss = game.move(this.players[i].pass(game.board),'circle');
                    } else {
                        miss = game.move(this.players[j].pass(game.board),'cross');
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
                        // hitting already used field
                        if (!miss) this.players[j].score-=misspen;
                        break;
                    case 'cross':
                        this.players[j].score++;
                        // hitting already used field
                        if (!miss) this.players[i].score-=misspen;
                        break;
                }
            }
            for (var j = i+1; j < this.players.length; j++) {
                turn = true;
                game = new TicTacToe();
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
                        if (!miss) this.players[j].score-=misspen;
                        break;
                    case 'cross':
                        this.players[j].score++;
                        if (!miss) this.players[i].score-=misspen;
                        break;
                }
            }
        }
    }
    compare (a,b) {
        return(a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);
    }
}