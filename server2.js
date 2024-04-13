const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const locations = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('locationUpdate', (update) => {
    const { driverId, latitude, longitude } = update;
    locations[driverId] = { latitude, longitude };

    // Print the received data
    console.log(`Received location update from driver ${driverId}: ${latitude}, ${longitude}`);

    // Broadcast the updated locations to all connected clients
    io.emit('locationsUpdate', locations);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => console.log('Server listening on port 3000'));
