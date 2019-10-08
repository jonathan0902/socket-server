const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.origins(['https://jhellberg.me/chat:443']);

io.on('connection', function (socket) {
    console.info("User connected");

    socket.on('chat message', function (message) {
        io.emit('chat message', message);
    });
});

server.listen(8300);
