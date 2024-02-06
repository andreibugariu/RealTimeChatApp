const express = require("express");
const cookieParser = require('cookie-parser');
const userController = require('../controllers/userControllers')
const router = express.Router();
const auth = require("../middleware/auth");

router.use(cookieParser());

router.post("/api/register", userController.register)
router.post("/api/login", userController.login)
router.post("/api/logout",auth, userController.logout)
router.get("/api/test", auth, userController.test)


module.exports =  router;