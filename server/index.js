///initialize expess server
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require('./routes/userRoutes');
require("dotenv").config();//In this way we acces dot.end

app.use(cors());
app.use(express.json());
app.use(userRoutes);


app.use('/asdasaa', (req, res, next) => {
    res.send("hello word")
})

mongoose.connect(process.env.MONGO_CONNECTION)
    .then(() => {
        console.log("Successfully logged to the DB")
        const server = app.listen(process.env.PORT, () => {
        console.log(`Server started at port ${process.env.PORT}`)
    })})
    .catch((err) => {
    console.log(err);
})