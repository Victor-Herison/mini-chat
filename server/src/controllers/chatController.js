const chatModel = require('../models/messages');

const chatController = {
    createChat: async function(req, res) {
        try{
            if (!req.body) {
                return res.status(400).json({ message: 'Invalid request body' });
            }
            const { firstId, secondId } = req.body;
            const chat = await chatModel.findOne({ members: { $all: [firstId, secondId] } });

            // Check if chat already exists
            if (chat) return res.status(200).json({ message: 'Chat already exists', chat });

            if (!firstId || !secondId) {
                return res.status(400).json({ message: 'Both user IDs are required' });
            }

            if (firstId.length !== 24 || secondId.length !== 24) {
                return res.status(400).json({ message: 'Invalid users IDs' });
            }

            const newChat = await chatModel.create({
                members: [firstId, secondId]
            });
            res.status(201).json({message: 'Chat created successfully', chat: newChat});

        }catch(error) {
            console.error('Error retrieving chats:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    deleteChat: async function(req, res) {
        try{
            if (!req.params || ! req.params.chatId){
                return res.status(400).json({message: 'Invalid request parameters, chat is required'})
            }

            const {chatId} = req.params;

            if (!chatId || chatId.length !== 24) {
                return res.status(400).json({ message: 'Invalid chat ID' });
            }

            const chat = await chatModel.findByIdAndDelete(chatId);
            

            if(!chat){
                return res.status(404).json({message: 'Chat not found'})
            }
            return res.status(200).json({message: 'Chat deleted sucessfully', chat});


        } catch(error){
            console.error('Error retrieving chats:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message})
        }
    },

    getChat: async function(req, res){
      try {
        if (!req.params || !req.params.firstId || !req.params.secondId) {
          return res.status(400).json({ message: 'Invalid request parameters, clients IDs are required' });
        }

        const {firstId, secondId} = req.params;
        const chat = await chatModel.findOne({ members: { $all: [firstId, secondId] } });

        if(!chat){
            return res.status(404).json({ message: 'Chat not found' });
        }

        return res.status(200).json({ message: 'Chat retrieved successfully', chat });

      }catch(error){
        console.error('Error retrieving chats:', error);
        return res.status(500).json({message: 'Internal server error', error: error.message});
      }  

    },

    getAllClientChats: async function(req, res){
        try{
            if (!req.params || !req.params.clientId) {
                return res.status(400).json({ message: 'Invalid request parameters, client ID is required' });
            }

            const { clientId } = req.params;

            const chats = await chatModel.find({ members: { $in: [clientId] } });

            if (!chats) {
                return res.status(404).json({ message: 'No chats found' });
            }

            return res.status(200).json({ message: 'Chats retrieved successfully', chats });
        }catch(error){
            console.error('Error retrieving chats:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }


}

module.exports = chatController;