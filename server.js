const express = require('express');
const path = require('path');
const app = express();
const server = app.listen(8000);
const io = require('socket.io')(server);

app.use('/static', express.static(path.join(__dirname, 'static')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let activeMember = [];
let currentColor;
let circles = [];
const colors = {
    yellow: "yellow",
    green: "green",
    blue: "blue",
    pink: "pink",
};

app.get('/', function(req, res) {
    res.render('index', { colors });
});

io.on('connection', function(socket) {

    socket.emit('selectColors', { colors, currentColor });

    let username = '';

    socket.on('submitUsername', function(data) {
        username = data.username;
        activeMember.push(username);
        io.emit('activeMembers', { activeMember });
    });

    io.emit('activeMembers', { activeMember });

    socket.on('disconnect', function() {
        let newArray = [];
        for (let i = 0; i < activeMember.length; i++) {
            if (activeMember[i] !== username) {
                newArray.push(activeMember[i]);
            }
        }
        activeMember = newArray;
        io.emit('userDisconnected', activeMember);
    });

    // Listen for new circles created by clients and broadcast to all other clients
    socket.on('newCircle', function(data) {
        circles.push(data);
        io.emit('newCircle', data);
    });

    socket.on('clearAllCircles', () => {
        io.emit('clearAllCircles'); // broadcast message to all connected clients to clear all circles
    });
});