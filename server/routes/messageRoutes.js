const express = require("express");
const messageController = require('../controllers/messageControllers')
const router = express.Router();


router.post("/api/addmsg", messageController.addMessage)
router.get("/api/getmsg", messageController.getAllMessage)




module.exports =  router;