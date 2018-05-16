class Player {
    constructor(dimensions){
        this.brain = new NeuralNet(dimensions);
        this.dimensions = dimensions;
        this.score = 0;
    }

    mutate(many, much) {
        var newPlayer = new Player(this.dimensions);
        newPlayer.brain = this.brain.mutate(many, much);
        newPlayer.brain.regualize();
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

class classicPlayer {
    evaluate(board, player) {
        var a = -1;
        if (player =='circle'){
            var a = 1;
        }
        return this.max_value(board,-Infinity, Infinity, player, a)[1];
    }
    
    max_value(board,alpha, beta, player, a) {
        var v = -Infinity;
        var pos = 0;
        var newplayer = 'circle';
        if (player =='circle'){
            newplayer = 'cross';
        }
        var check = this.terminalstate(board,a);
        if ( check != 3){
            return [check,null];
        }
        // try moves
        for (var i = 0; i < board.length; i++){
            if(board[i] !=0) continue;
            board[i] = (player =='circle') ? 1 : -1;
            var temp = this.min_value(board,alpha,beta,newplayer, a)[0]
            if (temp > v) {
                v = temp;
                pos = i;
            }
            board[i] = 0;
            if (v >= beta) return [v,pos];
            alpha = max(alpha,v);
        }
        return[v,pos]
    }

    min_value(board,alpha, beta, player, a) {
        var v = Infinity;
        var pos = 0;
        var newplayer = 'circle';
        if (player =='circle'){
            newplayer = 'cross';
        }
        var check = this.terminalstate(board,a);
        if ( check != 3){
            return [check,null];
        }
        // try moves
        for (var i = 0; i < board.length; i++){
            if(board[i] !=0) continue;
            board[i] = (player =='circle') ? 1 : -1;
            var temp = this.max_value(board,alpha,beta,newplayer, a)[0];
            if (temp < v) {
                v = temp;
                pos = i;
            }
            board[i] = 0;
            if (v <= alpha) return [v,pos];
            beta = min(beta,v);
        }
        return[v,pos]
    }

    terminalstate(board, a){
        // check for terminal state
        if (board[0] + board[1] + board[2] == 3 ||
            board[3] + board[4] + board[5] == 3 ||
            board[6] + board[7] + board[8] == 3 ||
            board[0] + board[3] + board[6] == 3 ||
            board[1] + board[4] + board[7] == 3 ||
            board[2] + board[5] + board[8] == 3 ||
            board[0] + board[4] + board[8] == 3 ||
            board[2] + board[4] + board[6] == 3 ) {
            return a;
        }
        if (board[0] + board[1] + board[2] == -3 ||
            board[3] + board[4] + board[5] == -3 ||
            board[6] + board[7] + board[8] == -3 ||
            board[0] + board[3] + board[6] == -3 ||
            board[1] + board[4] + board[7] == -3 ||
            board[2] + board[5] + board[8] == -3 ||
            board[0] + board[4] + board[8] == -3 ||
            board[2] + board[4] + board[6] == -3 ) {
            return -a;
        }
        if (board[0] != 0 && board[1] != 0 && board[2] != 0 && board[3] != 0 && 
            board[4] != 0 && board[5] != 0 && board[6] != 0 && board[7] != 0 && 
            board[8] != 0){
            return 0;
        }
        return 3;
    }
}