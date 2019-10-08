const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

let ioz = io;
let userz = {};

io.origins(['https://jhellberg.me:443']);

io.on('connection', function (socket) {
    console.info("User connected");

    socket.on('connected', (user) => {
        userz[socket.id] = user;
        io.emit('users', userz);
      });

    socket.on('chat message', function (message) {
        io.emit('chat message', message);
    });
});

server.listen(8300);
