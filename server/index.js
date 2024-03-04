///initialize expess server
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes')
require("dotenv").config();//In this way we acces dot.end

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true // Allow credentials (cookies)
}));
app.use(express.json());
app.use(cookieParser());
app.use(userRoutes);
app.use(messageRoutes);



mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => {
        console.log("Successfully logged to the DB")
        const server = app.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT}`)
    })})
    .catch((err) => {
    console.log(err);
})
