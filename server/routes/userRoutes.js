const express = require("express");
const cookieParser = require('cookie-parser');
const userController = require('../controllers/userControllers')
const router = express.Router();
const auth = require("../middleware/auth");

router.use(cookieParser());

router.post("/api/register", userController.register)
router.post("/api/login", userController.login)
router.get("/api/getUser/:id", userController.getUserByID)
router.post("/api/logout",auth, userController.logout)
router.get("/api/test", auth, userController.test)
router.get("/api/getUsers",userController.getAllUsers)


module.exports =  router;