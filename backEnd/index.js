const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is running');
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with id: ${socket.id} joined room: ${data}`);
    })
    
    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    })
    socket.on('disconnect', () => {
        console.log('A user disconnected', socket.id);
    });
});


server.listen(3001, () => {
    console.log('Server is running on port 3001');
});