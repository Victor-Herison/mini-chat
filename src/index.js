 const dotenv = require('dotenv').config();
const { Server } = require("socket.io");
const express = require('express');
const app = express();
const path = require('path');
const userRouter = require('./routes/userRouter');

app.use('/', express.static(path.join(__dirname,'..','public')));
console.log('Static files served from:', path.join(__dirname, 'public'));

app.use('/user',express.json(), userRouter);




app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port ${process.env.PORT || 3000}");
});