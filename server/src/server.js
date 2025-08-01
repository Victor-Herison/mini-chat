const dotenv = require('dotenv').config();
const path = require('path');
const { createServer } = require("http");
const socketIO = require("socket.io");
const express = require('express');
const cors = require('cors');
const app = express();


const corsOptions = {
  origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ["Authorization"]
};

app.use(cors(corsOptions));
const userRouter = require('./routes/userRouter');
const chatRouter = require('./routes/chatRouter');

app.use('/user',express.json(), userRouter);
app.use('/chat', express.json(), chatRouter);





const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

const io = socketIO(server);

const messages = [];
io.on('connection', (socket) => {
    socket.on('new_message',(msg) =>{
        console.log('New message received:', msg);
        messages.push(msg);
        io.emit('message', msg);
    })
}); 

