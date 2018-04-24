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
        var out = this.brain.pass(extendedboard);
        //get pos with maximum
        out.push(-1);
        var pos = 9;
        for (var j = 0; j < 9; j++) {
             if (out[j] > out[pos] && board[j] == 0) pos = j;
        }
        return pos;
    }
}