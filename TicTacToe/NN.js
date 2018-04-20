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
                this.matrix[i][j][k] = randn_bm();
                }
            }
        }
    }

    mutate(many , much) {
        // many = 1 means all random many= 0 none
        // much = 1 completely new entry much =0 same entry as before
        var newNet = new NeuralNet(this.matrix.length);
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < 9; j++) {
                for (var k = 0; k < 10; k++) {
                    if  (many > Math.random) {
                        newNet.matrix[i][j][k] = (1-much)*this.matrix[i][j][k] + much * randn_bm();
                        console.log(randn_bm());
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
                    tempNodes[j] += this.matrix[i][j][k]*board[k];
                }
            }
            for (var j = 0; j < 9; j++) {
                // activation
                tempNodes[j] = (tempNodes[j] > 0) ? tempNodes[j] : 0;
            }
            board = tempNodes;
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

// gaussian with E=0 and V=1
function randn_bm() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}