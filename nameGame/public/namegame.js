var socket;
var but, input, rdy, but2;
var id;

function setup() {
    createCanvas(1000,500);
    background(255);
    socket = io.connect('https://localhost:8080');
    input = createInput();
    
    input.position(50, 50);
    but = createButton('ready');
    but.position(input.x+input.width,50);
    but.mousePressed(ready);
    socket.on('playerUpdate', showPlayerList);
    socket.on('gameStart', showGame);
    socket.on('newGame', resetGame);
    socket.on('id', (data) => {id = data;});
    rdy = false;
    textSize(32);
    fill(0);
    text('Enter Nickname:', 10,40);
}

function resetGame (){
    but2.remove();
    rdy = false;
    background(255);
    text('Enter Nickname:', 10,40);
    input = createInput();
    input.position(50, 50);
    but = createButton('ready');
    but.position(input.x+input.width,50);
    but.mousePressed(ready);
}

function showGame(data) {
    background(255);
    input.remove();
    but.remove();
    console.log(data)
    for(var i = 0; i<data.length; i++) {
        text(data[i][1]+":", 10, 50 + 50*i);
        if (data[i][0]!=id) {
            text(data[i][2], 200, 50 + 50*i);
        } else {
            text('?', 200, 50 + 50*i);
        }
    }
    but2 = createButton('restart?');
    but2.position(0,0);
    but2.mousePressed(()=>{socket.emit('again');});
}

function showPlayerList(data) {
    if (rdy) {
        background(255);
        text('Enter name to be guessed:', 10,40);
        var i = 0;
        for(var player in data) {
            if (data[player].nick) {
                if (data[player].sug) {
                    text(data[player].nick + " is ready to start", 10, 100 + 50*i++);
                } else {
                    text(data[player].nick + " needs to put a name in the pool", 10, 100 + 50*i++);
                }
            }
        }
    }
}


function ready() {
    if (!rdy) {
        if (input.value()) {
            rdy = true;
            socket.emit('ready',input.value());
            input.value("");
        } else {
            background(255);
            fill(0);
            text('Enter Nickname:', 10,40);
            text("Nickname must contain letters", 10,100);
        }
    } else {
        if (input.value()) {
            socket.emit('sug',input.value());
            input.value("");
        } else {
            background(255);
            fill(0);
            text('Enter name to be guessed:', 10,40);
            text("name must contain letters", 10,100);
        }
    }
}