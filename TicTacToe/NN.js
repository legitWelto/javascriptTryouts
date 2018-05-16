class NeuralNet {
    constructor(dimensions){
        // dimensions array of number of nodes per layer dimensions[0] input
        this.dimensions = dimensions;
        this.matrix = new Array(dimensions.length - 1);
        for (var i = 0; i < this.matrix.length; i++) {
            // output has dimension of nextlayer
            this.matrix[i] = new Array(dimensions[i+1]);
            for (var j = 0; j < dimensions[i+1]; j++) {
                // input this layer + constant
                this.matrix[i][j] = new Array(dimensions[i] + 1);
            }
        }
    }

    regualize() {
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                for (var k = 0; k < this.matrix[i][j].length; k++) {
                    if( this.matrix[i][j][k] < -1) this.matrix[i][j][k] = -1;
                    else if (this.matrix[i][j][k] > 1) this.matrix[i][j][k] = -1;
                }
            }
        }
    }

    randomize(){
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                for (var k = 0; k < this.matrix[i][j].length; k++) {
                this.matrix[i][j][k] = Math.random() * 2 - 1;
                }
            }
        }
    }

    mutate(many , much) {
        // many = 1 means all random many= 0 none
        // much = 1 completely new entry much =0 same entry as before
        var newNet = new NeuralNet(this.dimensions);
        for (var i = 0; i < this.matrix.length; i++) {
            for (var j = 0; j < this.matrix[i].length; j++) {
                for (var k = 0; k < this.matrix[i][j].length; k++) {
                    if  (many > Math.random()) {
                        newNet.matrix[i][j][k] = this.matrix[i][j][k] + much * randn_bm();
                    } else {
                        newNet.matrix[i][j][k] = this.matrix[i][j][k];
                    }
                }
            }
        }
        return newNet;
    }

    pass(input) {
        var tempNodes;
        for (var i = 0; i < this.matrix.length; i++) {
            tempNodes = Array(this.dimensions[i+1]);
            for (var j = 0; j < this.matrix[i].length; j++) {
                // const factor
                tempNodes[j] = this.matrix[i][j][this.matrix[i][j].length - 1];
                for (var k = 0; k < this.matrix[i][j].length - 1; k++) {
                    tempNodes[j] += this.matrix[i][j][k]*input[k];
                }
            }
            for (var j = 0; j < 9; j++) {
                // activation; relu
                tempNodes[j] = (tempNodes[j] > 0) ? tempNodes[j] : 0;
            }
            input = tempNodes;
        }
        return tempNodes;
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