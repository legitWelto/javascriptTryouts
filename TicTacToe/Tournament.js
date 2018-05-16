class Tournament {
    constructor() {
        this.total_num_players = 200;
        this.newPlayers = 100;
        this.games_per_round = 50;
        this.dimensions = [18,18,12,9];
        this.cross = new Array(this.total_num_players);
        this.circle = new Array(this.total_num_players);
        for (var i = 0; i < this.cross.length; i++) {
            this.cross[i] = new Player(this.dimensions);
            this.cross[i].brain.randomize();
            this.circle[i] = new Player(this.dimensions);
            this.circle[i].brain.randomize();
        }
    }
    
    roundrobin(){
        this.getScore();
        this.circle.sort(this.compare);
        this.cross.sort(this.compare);
        count++;
        if (count%10 == 0) {
            this.drawTopMatches();
            text("Score",400, 50)
            text("Cross #0: " + this.cross[0].score, 400, 100);
            text("Cross #1: " +this.cross[1].score, 400, 150);
            text("Circle #0: " + this.circle[0].score, 400, 200);
            text("Circle #1: " + this.circle[1].score, 400, 250);
        }
        for (var i = 0; i < this.total_num_players- this.newPlayers; i++) {
            this.cross[i].score = 0;
            this.circle[i].score = 0;
        }
        var num;
        for (var i = this.total_num_players - this.newPlayers; i < this.total_num_players; i++) {
            num = Math.random();
            this.cross[i] = this.cross[floor(num*num* (this.total_num_players - this.newPlayers))].mutate(0.1, 0.5);
            num = Math.random();
            this.circle[i] = this.circle[floor(num*num* (this.total_num_players - this.newPlayers))].mutate(0.1, 0.5);
        }
    }

    compare (a,b) {
        return(a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0);
    }

    drawTopMatches(){
        background(255);
        var game,turn;
        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 2; j++) {
                turn = true;
                game = new TicTacToe();
                while (game.state == 'ongoing') {
                    if (turn) {
                        game.move(this.circle[i].evaluate(game.board),'circle');
                    } else {
                        game.move(this.cross[j].evaluate(game.board),'cross');
                    }
                    turn = !turn;
                }
                game.show(i*(showbox+5),j*(showbox+5));
                switch (game.state){
                    case 'draw':
                        text("Draw",i*showbox,j*showbox+showbox*0.5);
                        break;
                    case 'circle':
                        text("Circle "+ i +" won",i*showbox,j*showbox+showbox*0.5);
                        break;
                    case 'cross':
                        text("Cross "+ j +" won", i*showbox,j*showbox+showbox*0.5);
                        break;
                }
            }
        }
        text("Round #" + count, 0, 425);
    }

    getScore() {
        var turn, game, c, board, pos;
        for (var i = 0; i < this.circle.length; i++) {
            for (var j = 0; j < this.games_per_round; j++) {
                turn = true;
                c = 0;
                game = new TicTacToe();
                while (game.state == 'ongoing'){
                    if (turn) {
                        game.move(this.circle[i].evaluate(game.board),'circle');
                    } else {
                        board = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), -1];
                        pos = 9;
                        for (var k = 0; k < 9; k++) {
                             if (board[k] > board[pos] && game.board[k] == 0) pos = k;
                        }
                        game.move(pos,'cross');
                    }
                    c++;
                    turn = !turn;
                }
                switch(game.state){
                    case 'draw':
                        this.circle[i].score += 10;
                        break;
                    case 'circle':
                        this.circle[i].score += 24-c;
                        break;
                    case 'cross':
                        this.circle[i].score += c;
                        break;
                }
            }
        }
        for (var i = 0; i < this.cross.length; i++) {
            for (var j = 0; j < this.games_per_round; j++) {
                turn = true;
                c = 0;
                game = new TicTacToe();
                while (game.state == 'ongoing'){
                    if (turn) {
                        board = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), -1];
                        pos = 9;
                        for (var k = 0; k < 9; k++) {
                             if (board[k] > board[pos] && game.board[k] == 0) pos = k;
                        }
                        game.move(pos,'circle');
                    } else {
                        
                        game.move(this.cross[i].evaluate(game.board),'cross');
                    }
                    c++;
                    turn = !turn;
                }
                switch(game.state){
                    case 'draw':
                        this.cross[i].score += 10;
                        break;
                    case 'circle':
                        this.cross[i].score += c;
                        break;
                    case 'cross':
                        this.cross[i].score += 24-c;
                        break;
                }
            }
        }
    }

}
