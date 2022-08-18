const mongoose = require("mongoose");
//??
const AdvertBaseSchema = new mongoose.Schema({
    images: [{
        path: { type: String, required: true },
    }, ],
    title: { type: String, default: true, min: 10, max: 100 },
    description: { type: String, required: true, min: 30, max: 500 },
    price: { type: Number, required: true },
    categoryPath: { type: String },
    address: {
        city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
        district: { type: mongoose.Schema.Types.ObjectId, ref: "District" },
        town: { type: mongoose.Schema.Types.ObjectId, ref: "Town" },
    },
}, {
    versionKey: false,
});

module.exports = AdvertBaseSchema;