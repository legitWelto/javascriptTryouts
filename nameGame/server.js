var express = require('express');
var players = {};
var runs = false;

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log('new connection: ' + socket.id);
    var id = socket.id;
    io.to(id).emit('id',id);
    players[id] = {'nick':'', 'sug':'', 'again':false};
    socket.on('ready', (data) => {if(!runs) updatePlayerNames(data,id);});
    socket.on('sug', (data) => {if(!runs) updatePlayerSuggests(data,id);});
    socket.on('again', () => {if(runs) restart(id);});
    socket.on('disconnect', () => {delete players[id];console.log(players);});
}

function restart(id) {
    players[id].again = true;
    allrdy = true;
    for(player in players) {
        if (!players[player].again) {
            allrdy = false;
            break;
        }
    }
    if (allrdy){
        for(var player in players) {
            players[player].again = false;
            players[player].sug = "";
            players[player].nick = "";
        }
        runs = false;
        io.sockets.emit('newGame');
    }
}

function updatePlayerNames(data, id){
    players[id].nick = data;
    io.sockets.emit('playerUpdate', players);
    console.log(players);
}

function updatePlayerSuggests(data,id) {
    players[id].sug = data;
    io.sockets.emit('playerUpdate', players);
    console.log(players);
    allrdy = true;
    for(player in players) {
        if (!players[player].sug) {
            allrdy = false;
            break;
        }
    }
    if (allrdy){
        arrPlayer = [];
        newPlayer = [];
        for (player in players) {
            arrPlayer.push([player,players[player].nick,players[player].sug]);
        }
        var i = randInt(arrPlayer.length);
        var lastSug = arrPlayer[i][2];
        var spli = arrPlayer.splice(i,1)
        newPlayer.push(spli[0]);
        var j = 0;
        while (arrPlayer.length) {
            i = randInt(arrPlayer.length);
            newPlayer[j++][2] = arrPlayer[i][2];
            newPlayer.push(arrPlayer.splice(i,1)[0]);
        }
        newPlayer[newPlayer.length-1][2] = lastSug;
        console.log(newPlayer);
        io.sockets.emit('gameStart', newPlayer);
        runs = true;
    }
}

function randInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
