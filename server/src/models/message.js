const connectDB = require('../db/connectDB.js');


const messageSchema = new connectDB.Schema({
    senderId: {type: connectDB.Schema.Types.ObjectId},
    reciverId: {type: connectDB.Schema.Types.ObjectId},
    chatId: {type: connectDB.Schema.Types.ObjectId},
    text: String

},{
    timestamps: true
})


const messageModel = connectDB.model('Message', messageSchema);
module.exports = messageModel;