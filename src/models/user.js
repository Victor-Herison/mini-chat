const connectDB = require('../db/connectDB.js');

const userSchema = new connectDB.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Ensuring password is at least 6 characters long
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const userModel = connectDB.model('User', userSchema);
module.exports = userModel;