const mongoose = require("mongoose");
require("dotenv/config");
//connectionString .env file
const connection = mongoose.connect(process.env.CONNECTION_STRING, (e) => {
    if (e) {
        console.log(e);
    } else {
        console.log("database connected");
    }
});

module.exports = connection;
