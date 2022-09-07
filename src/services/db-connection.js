/* eslint-disable max-len */
const mongoose = require("mongoose");
require("dotenv/config");
//connectionString .env file
const connection = mongoose.connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.dqbxq.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    (e) => {
        if (e) {
            console.log(e);
        } else {
            console.log("database connected");
        }
    }
);

module.exports = connection;
