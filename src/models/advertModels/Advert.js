const mongoose = require("mongoose");

const AdvertSchema = new mongoose.Schema({
    advert: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "dynamicModel",
    },
    type: {
        type: String,
        required: true,
    },
    dynamicModel: {
        type: String,
        required: true,
        enum: ["AdvertHousing", "AdvertLand", "AdvertWorkPlace"],
    },
}, {
    versionKey: false,
});

module.exports = mongoose.model("Advert", AdvertSchema);