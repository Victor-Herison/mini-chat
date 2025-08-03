const connectDB = require('../db/connectDB.js');


const chatSchema = new connectDB.Schema({
    members: Array,


},{
    tumestamps: true
})

const groupChatSchema = new connectDB.Schema({
    name: String,
    members: Array,
    admins: Array
}, {
    timestamps: true
})

const groupChatModel = connectDB.model('GroupChat', groupChatSchema);
const chatModel = connectDB.model('Chat', chatSchema);
module.exports = {chatModel, groupChatModel};