const { get } = require('mongoose')
const messageModel = require('../models/message')


const messageController = {
    createMessage: async function(req,res){
        try{
            if (!req.body) return res.status(400).json({message: "Invalid request body"})
        
            const {senderId, reciverId, chatId, text} = req.body

            if (!senderId || !reciverId || !chatId || !text) return res.status(400).json({message: "Invalid request body, al fields needs to be complete"})
        
            messageModel.create({senderId, reciverId, chatId, text})

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

            res.status(200).json({ messages });

        }catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    deleteMessage: async function(req, res) {
        try {
            const messageId = req.params.id;
            if (!messageId) {
                return res.status(400).json({ message: 'Message ID is required' });
            }

            const message = await messageModel.findAndDelete({ _id: messageId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }


}

module.exports = messageController;