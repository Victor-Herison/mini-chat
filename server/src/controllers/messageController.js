const messageModel = require('../models/message')


const messageController = {
    createMessage: async function(req,res){
        try{
            if (!req.body) return res.status(400).json({message: "Invalid request body"})
        
            const {senderId, reciverId, chatId, text} = req.body

            if (!senderId || !reciverId || !chatId || !text) return res.status(400).json({message: "Invalid request body, al fields needs to be complete"})
        
            const newMessage = await messageModel.create({senderId, reciverId, chatId, text})

            return res.status(201).json({message: 'Message send'})
        }catch(error){
            console.error(error);
            return res.status(500).json({message: 'Internal server error: ', error: error.message})
        }
    },

    getMessages: async function(req, res) {
        try {
            const chatId = req.query.chatId;
            if (!chatId) {
                return res.status(400).json({ message: 'Chat ID is required' });
            }

            const messages = await messageModel.find({ chatId })

            if(!messages || messages.length === 0) {
                return res.status(404).json({ message: 'No messages found for this chat' });
            }

            res.status(200).json({ messages });

        }catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    deleteMessage: async function(req, res) {
        try {
            const messageId = req.params.messageId;
            if (!messageId) {
                return res.status(400).json({ message: 'Message ID is required' });
            }
            
            const message = await messageModel.findByIdAndDelete(messageId);
            
            if (!message) {
                return res.status(404).json({ message: 'Message not found' });
            }

            res.status(200).json({ message: 'Message deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }


}

module.exports = messageController;