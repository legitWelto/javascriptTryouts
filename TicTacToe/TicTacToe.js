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
            return false;
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