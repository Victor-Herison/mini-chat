const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const userRouter = require('./routes/userRouter.ts');


app.use('/user',express.json(), userRouter);




app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});