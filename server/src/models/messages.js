const connectDB = require('../db/connectDB.js');


const chatSchema = new connectDB.Schema({
    members: Array,


},{
    tumestamps: true
})

const chatModel = connectDB.model('Chat', chatSchema);
module.exports = chatModel;