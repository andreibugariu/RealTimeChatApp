const express = require("express");
const messageController = require('../controllers/messageControllers')
const router = express.Router();
const auth = require("../middleware/auth");



router.post("/api/addmsg", auth,messageController.addMessage)
router.get("/api/getmsg", auth,messageController.getAllMessage)




module.exports =  router;