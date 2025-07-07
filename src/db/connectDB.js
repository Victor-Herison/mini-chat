require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


module.exports = mongoose;