const router = require("express").Router();
const chatController = require("../controllers/chatController.js");

//chat routes
router.post("/create-chat", chatController.createChat);
router.post("/create-group", chatController.createGroup);
router.delete("/delete-chat/:chatId", chatController.deleteChat);
router.get("/get-chat/:firstId/:secondId", chatController.getChat);
router.get("/get-all-chats/:clientId", chatController.getAllClientChats);

//group chat routes
router.patch("/add-user-group", chatController.addUserToGroup);
router.patch("/add-admin-rule", chatController.addAdminRule);
router.delete("/delete-group/:groupId", chatController.deleteGroup);
router.delete("/remove-user-group", chatController.removeUserFromGroup);
router.get("/get-group/:groupId", chatController.getGroup);
router.get("/get-all-groups/:clientId", chatController.getAllClientGroups);

module.exports = router; 