const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require('../controllers/authController');

router
    .route("/")
    .get(userController.getAllUsers)
    .post(userController.createUser);

router.get("/email?:email",userController.getUserByEmail);
router.get("/checkPassword",userController.checkOldPassword);

router
    .route("/:id")
    .get(userController.getUserById)
    .delete(userController.deleteUser)
    .patch(userController.updateUser);

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/login_register', authController.login_register);
router.patch("/activate/:id", authController.activateAccount);
module.exports = router;