const router = require("express").Router();
const messageController = require("../controllers/messageController.js");
const auth = require("../controllers/authController.js");

router.post("/create-message", messageController.createMessage);
router.get("/get-messages", messageController.getMessages);
router.delete("/delete-message/:messageId", messageController.deleteMessage);


module.exports = router;
