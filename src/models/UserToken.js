const mongoose = require("mongoose");
const User = require("./User");

const UserTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, {
    versionKey: false,
});

module.exports = mongoose.model("UserToken", UserTokenSchema);