//Create user model
const mongoose = require('mongoose');

const userSChema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
        unique : true
    },
    email: {
        type: String,
        require: true,
        unique : true
    },
    password: {
        type: String,
        require: true
    },
    avatarImg: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model("Users", userSChema);