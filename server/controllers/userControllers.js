const Users = require("../model/userModel")
const bcrypt= require("bcrypt")



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




module.exports = {
    register
}