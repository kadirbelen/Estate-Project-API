const mongoose = require("mongoose");

const ImageTemporarySchema = new mongoose.Schema(
    {
        remoteId: { type: String, required: true },
        url: { type: String, require: true },
        name: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("ImageTemporary", ImageTemporarySchema);
