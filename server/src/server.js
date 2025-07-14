const dotenv = require('dotenv').config();
const path = require('path');
const { createServer } = require("http");
const socketIO = require("socket.io");
const express = require('express');
const cors = require('cors');
const app = express();


const corsOptions = {
  origin: 'http://localhost:5173', // Adjust this to your client URL
    methods: ['GET', 'POST'],
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));
const userRouter = require('./routes/userRouter');
const httpServer = createServer(app);



app.use('/', express.static(path.join(__dirname,'..','public')));
console.log('Static files served from:', path.join(__dirname, '..', 'public'));

app.use('/user',express.json(), userRouter);





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

