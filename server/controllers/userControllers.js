const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Users = require("../model/userModel")
require("dotenv").config();


const api_avatar = "https://ui-avatars.com/api/?name=";


const register = async (req, res, next) => { 
    const { username, email, password, confirm_password } = req.body;
    const set_avatar = api_avatar + username;

    if (password !== confirm_password) {
       return  res.json({ message: "Please provide the correct password" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await Users.create({
        userName: username,
        email: email,
        password: hashedPassword,
        avatarImg: set_avatar
        }) 
        res.json({message: "Successfully created new User"})
    } catch (err) {
        res.json({message: "error, can;t create new user"})
    }

};

const login = async (req, res, next) => { 
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        const is_password_valid = await bcrypt.compare(password, user.password)
        if (!is_password_valid) {
            return res.status(401).send({message:"Incorrect email or password"})
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET,{expiresIn : "1h"});
        res.cookie('token', token, { httpOnly: true });
        res.send({ "user_id": user._id , "token": token})
    } catch (err) {
        res.status(401).send({message: "Incorrect username or password"})
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.send({message : "Successfully logout"})
}

const test = async (req, res, next)=>{
    res.send(req.user)
}

const getUserByID = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await Users.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({message : "Error "+err})
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await Users.find();
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({message: "Can't get all users"})
    }
}

module.exports = {
    register,
    login,
    test,
    logout,
    getUserByID,
    getAllUsers
}