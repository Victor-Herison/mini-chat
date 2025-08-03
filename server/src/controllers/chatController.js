const { get } = require('mongoose');
const {chatModel, groupChatModel} = require('../models/chats');

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
    },


    //group functions

    createGroup: async function(req, res){
        try {
            if (!req.body) {
                return res.status(400).json({ message: 'Invalid request body' });
            }

            const { groupName, members, admins } = req.body;

            if (!groupName || !members || !admins) {
                return res.status(400).json({ message: 'Group name, members, and admins are required' });
            }

            if (!Array.isArray(members) || !Array.isArray(admins)) {
                return res.status(400).json({ message: 'Members and admins must be arrays' });
            }

             if (members.length === 0 || admins.length === 0) {
                return res.status(400).json({ message: 'Members and admins arrays cannot be empty' });
            }

            if (members.some(member => member.length !== 24) ||admins.some(admin => admin.length !== 24)) {
                return res.status(400).json({ message: 'Invalid member or admin ID format' });
            }
            const newGroupChat = await groupChatModel.create({
                name: groupName,
                members: members,
                admins: admins
            });

            res.status(201).json({message: 'Group created successfully', group: newGroupChat});
        }catch(error) {
            console.error("Error creating group chat:", error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    addUserToGroup: async function(req, res) {
        try {
            if (!req.body || !req.body.groupId || !req.body.userId) {
                return res.status(400).json({ message: 'Invalid request body, group ID and user ID are required' });
            }

            const { groupId, userId } = req.body;

            if (!groupId || groupId.length !== 24 || !userId || userId.length !== 24) {
                return res.status(400).json({ message: 'Invalid group ID or user ID' });
            }

            if(await groupChatModel.find({ members: { $in: [userId] }})){
                return res.status(400).json({ message: 'User is already a member of the group' });
            }

            const group = await groupChatModel.findByIdAndUpdate(groupId,
                { $addToSet: { members: userId } },
                { new: true }
            );

            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }

            res.status(200).json({ message: 'User added to group successfully', group });
        }catch(error) {

        console.error('Error adding user to group:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });

        }
    },

    addAdminRule: async function(req, res) {
        try {
            if (!req.body || !req.body.groupId || !req.body.userId) {
                return res.status(400).json({ message: 'Invalid request body, group ID and user ID are required' });
            }

            const { groupId, userId } = req.body;

            if (!groupId || groupId.length !== 24 || !userId || userId.length !== 24) {
                return res.status(400).json({ message: 'Invalid group ID or user ID' });
            }

            const group = await groupChatModel.findByIdAndUpdate(groupId,
                { $addToSet: { admins: userId } },
                { new: true }
            );

            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }

            res.status(200).json({ message: 'User added to admin members successfully', group });
        }catch(error) {

        console.error('Error adding user to group:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
        
        }
    },

    deleteGroup: async function(req, res) {
        try {
            if (!req.params || !req.params.groupId) {
                return res.status(400).json({ message: 'Invalid request parameters, group ID is required' });
            }
            const { groupId } = req.params;

            if (!groupId || groupId.length !== 24) {
                return res.status(400).json({ message: 'Invalid group ID' });
            }

            const group = await groupChatModel.findByIdAndDelete(groupId);

            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }

            return res.status(200).json({ message: 'Group deleted successfully', group });

        }catch(error) {
            console.error('Error deleting group:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    removeUserFromGroup: async function(req, res) {
        try {
            if (!req.body || !req.body.groupId || !req.body.userId) {
                return res.status(400).json({ message: 'Invalid request body, group ID and user ID are required' });
            }
            const { groupId, userId } = req.body;

            if (!groupId || groupId.length !== 24 || !userId || userId.length !== 24) {
                return res.status(400).json({ message: 'Invalid group ID or user ID' });
            }


            const group = await groupChatModel.findByIdAndUpdate(groupId,
                { $pull: { members: userId } },
                {$pull: { admins: userId }},
                { new: true }
            );

            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }

            res.status(200).json({ message: 'User removed from group successfully', group });
        }catch(error) {
            console.error('Error deleting member from group:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    getGroup: async function(req, res) {
        try {
            if (!req.params || !req.params.groupId) {
                return res.status(400).json({ message: 'Invalid request parameters, group ID is required' });
            }

            const { groupId } = req.params;

            if (!groupId || groupId.length !== 24) {
                return res.status(400).json({ message: 'Invalid group ID' });
            }

            const group = await groupChatModel.findById(groupId);

            if (!group) {
                return res.status(404).json({ message: 'Group not found' });
            }

            return res.status(200).json({ message: 'Group retrieved successfully', group });
        }catch(error) {
            console.error('Error retrieving group:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    },

    getAllClientGroups: async function(req, res){
        try{
            if (!req.params || !req.params.clientId) {
                return res.status(400).json({ message: 'Invalid request parameters, client ID is required' });
            }

            const { clientId } = req.params;

            const chats = await groupChatModel.find({ members: { $in: [clientId] } });
            console.log(chats);

            if (!chats || chats.length === 0) {
                return res.status(404).json({ message: 'No groups found' });
            }

            return res.status(200).json({ message: 'Chats retrieved successfully', chats });
        }catch(error){
            console.error('Error retrieving chats:', error);
            return res.status(500).json({ message: 'Internal server error', error: error.message });
        }
    }
            

}

module.exports = chatController;