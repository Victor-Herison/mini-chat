require('dotenv').config();
const mongoose = require('mongoose');
console.log('Tentando conectar com a URI:', process.env.DB_URI)
mongoose.connect(process.env.DB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


module.exports = mongoose;