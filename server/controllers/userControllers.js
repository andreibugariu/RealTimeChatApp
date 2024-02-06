const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const Users = require("../model/userModel")
require("dotenv").config();


const register = async (req, res, next) => { 
    const { username, email, password, confirm_password } = req.body;

    if (password !== confirm_password) {
       return  res.json({ message: "Please provide the correct password" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await Users.create({
        userName: username,
        email: email,
        password: hashedPassword
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
        const token = jwt.sign({ id: user._id }, process.env.SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.send({ "user_id": user._id })
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




module.exports = {
    register,
    login,
    test,
    logout
}