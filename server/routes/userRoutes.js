const express = require("express");
const userController = require('../controllers/userControllers')
const router = express.Router();

router.post("/api/register", userController.register)

module.exports =  router;