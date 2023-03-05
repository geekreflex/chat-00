const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const port = 8000;

app.get('/', (req, res) => {
  res.send('<i>Server is up and running...</i>');
});

io.on('connection', (socket) => {
  socket.broadcast.emit('hi', 'a user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    socket.broadcast.emit('bye', 'user disconnected');
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
