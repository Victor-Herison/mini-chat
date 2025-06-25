const router = require('express').Router();
const userController = require('../middleware/userController.ts');

router.post('/register', userController.createUser);
router.post('/login',userController.login);
router.patch('/update-password', userController.updateUserPassword);
router.patch('/update-nickname', userController.updateUserNickname);
router.get('/get-user', userController.getUser);
router.delete('/delete-user', userController.deleteUser);

module.exports = router;