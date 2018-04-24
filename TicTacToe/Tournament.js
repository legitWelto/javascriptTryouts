class Tournament {
    constructor() {
        this.total_num_players = 20;
        this.dimensions = [18,3,9];
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
        var total = 0;
        for (var i = 0; i < this.cross.length; i++) total += this.cross[i].score;
        total = total/this.total_num_players;
        while (true) {
            if (this.cross[this.cross.length - 1].score > 0.99*total
                && this.cross[this.cross.length - 1].score > 0) break;
            this.cross.pop();
            if (this.cross.length == 0) {
                this.cross = new Array(this.total_num_players);
                for (var i = 0; i < this.total_num_players; i++) {
                    this.cross[i] = new Player(this.dimensions);
                    this.cross[i].brain.randomize();
                }
                console.log("reCross");
                return;
            }
        }
        var survivingCross = this.cross.length;
        var newCross = new Array(this.total_num_players);
        for (var i = 0; i < survivingCross; i++) {
            this.cross[i].score = 0;
            newCross[i] = this.cross[i];
        }
        for (var i = survivingCross; i < this.total_num_players; i++) {
            var num =floor(Math.random() * survivingCross);
            //console.log(num);
            newCross[i] = this.cross[num].mutate(Math.random() * 0.5, Math.random() * 0.5);
        }
        this.cross = newCross;
        
        var total = 0;
        for (var i = 0; i < this.circle.length; i++) total += this.circle[i].score;
        total = total/this.total_num_players;
        while (true) {
            if (this.circle[this.circle.length - 1].score > 0.99*total
                && this.circle[this.circle.length - 1].score > 0) break;
            this.circle.pop();
            if (this.circle.length == 0) {
                this.circle = new Array(this.total_num_players);
                for (var i = 0; i < this.total_num_players; i++) {
                    this.circle[i] = new Player(this.dimensions);
                    this.circle[i].brain.randomize();
                }
                console.log("reCircle");
                return;
            }
        }
        var survivingCircle = this.circle.length;
        var newCircle = new Array(this.total_num_players);
        for (var i = 0; i < survivingCircle; i++) {
            this.circle[i].score = 0;
            newCircle[i] = this.circle[i];
        }
        for (var i = survivingCircle; i < this.total_num_players; i++) {
            var num =floor(Math.random() * survivingCircle);
            //console.log(num);
            newCircle[i] = this.circle[num].mutate(Math.random() * 0.5, Math.random() * 0.5);
        }
        this.circle = newCircle;
        /*if (count%1 == 0) {
            console.log(survivingCross +" surviving Crosses" + survivingCircle +" surviving Circels");
        }*/
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
        var turn, game, miss;
        var misspen = 10;
        for (var i = 0; i < this.circle.length; i++) {
            for (var j = 0; j < this.cross.length; j++) {
                turn = true;
                game = new TicTacToe();
                while (game.state == 'ongoing'){
                    if (turn) {
                        miss = game.move(this.circle[i].evaluate(game.board),'circle');
                        if (miss) {this.circle[i].score+=1;}
                    } else {
                        miss = game.move(this.cross[j].evaluate(game.board),'cross');
                        if (miss) {this.cross[j].score+=1;}
                    } 
                    turn = !turn;
                }
                switch(game.state){
                    case 'draw':
                        this.circle[i].score += 5;
                        this.cross[j].score += 5;
                        break;
                    case 'circle':
                        this.circle[i].score += 10;
                        // hitting already used field
                        if (!miss) this.cross[j].score-=misspen;
                        break;
                    case 'cross':
                        this.cross[j].score += 10;
                        // hitting already used field
                        if (!miss) this.circle[i].score-=misspen;
                        break;
                }
            }
        }
    }

}