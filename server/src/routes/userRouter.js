const router = require("express").Router();
const userController = require("../controllers/userController.js");
const auth = require("../controllers/authController.js");

router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.patch("/update-password", auth, userController.updateUserPassword);
router.patch("/update-nickname", auth, userController.updateUserNickname);
router.get("/get-user", auth, userController.getUser);
router.delete("/delete-user", auth, userController.deleteUser);

module.exports = router;
