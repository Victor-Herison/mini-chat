const router = require("express").Router();
const chatController = require("../controllers/chatController.js");

router.post("/create-chat", chatController.createChat);
router.delete("/delete-chat/:chatId", chatController.deleteChat);
router.get("/get-chat/:firstId/:secondId", chatController.getChat);
router.get("/get-all-chats/:clientId", chatController.getAllClientChats);

module.exports = router;