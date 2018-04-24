class Player {
    constructor(dimensions){
        this.brain = new NeuralNet(dimensions);
        this.dimensions = dimensions;
        this.score = 0;
    }

    mutate(many, much) {
        var newPlayer = new Player(this.dimensions);
        newPlayer.brain = this.brain.mutate(many, much);
        return newPlayer;
    }

    evaluate(board) {
        var extendedboard = Array(18);
        for(var i =0; i < 9; i++) {
            extendedboard[2*i] = (board[i] == 1)?1:0;
            extendedboard[2*i + 1] = (board[i] == -1)?1:0;
        }
        board = this.brain.pass(extendedboard);
        //get pos with maximum
        var pos = 0;
        for (var j = 1; j < 9; j++) {
             if (board[j] > board[pos]) pos = j;
        }
        return pos;
    }
}