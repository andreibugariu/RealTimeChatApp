const messageModel = require("../model/messageModel");
require("dotenv").config();

const addMessage = async (req, res, next) => { 
    try {
        const { sender, receiver, msg } = req.body;
        const data = await messageModel.create({
        message: { text: msg },
        users: [sender, receiver],
        sender: sender
        })
        
        res.status(200).send({message: "Send message successfully"})
    } catch (err) {
        res.status(400).send({message: "Error, can't send the message"})
    }
    
};

const getAllMessage = async (req, res, next) => { 
   //When making a GET request with query parameters, 
   //you don't typically access them in Express via req.body. Instead, you access 
   //them from the query string(e.g., req.query.sender and req.query.receiver).
    try {
       const { sender, receiver } = req.query;
        const sender_messages = await messageModel.find({
            users: [sender, receiver]
        })
        const receiver_messages = await messageModel.find({
            users: [receiver, sender]
        })
        console.log(sender_messages);
        console.log(receiver_messages);
        const all_msg = receiver_messages.concat(sender_messages)
        const orderend_msg = all_msg.sort((a, b) => a.createdAt - b.createdAt);
        res.status(200).send(orderend_msg)
    } catch (err) {
        res.status(400).send({message: "Error, can't get messages"})
    }
};

module.exports = {
    addMessage,
    getAllMessage
}

