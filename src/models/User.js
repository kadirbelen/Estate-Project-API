const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: { type: String, required: true, min: 3, max: 50 },
    email: { type: String, require: true, min: 6, max: 255, unique: true },
    password: { type: String, required: true, min: 6 },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);