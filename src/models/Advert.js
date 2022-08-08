const mongoose = require("mongoose");
const AdvertProperty = require("./AdvertProperty");

const AdvertSchema = new mongoose.Schema({
    image: [{
        path: { type: String, required: true },
    }, ],
    title: { type: String, required: true, min: 15, max: 100 },
    description: { type: String, required: true, min: 30, max: 250 },
    price: { type: Number, required: true },
    roomCount: { type: String, required: true },
    grossSquareMeters: { type: Number, required: true },
    netSquareMeters: { type: Number, required: true },
    buildingAge: { type: Number, required: true },
    floor: { type: Number, required: true },
    heatingType: { type: String, required: true },
    itemStatus: { type: String },
    categoryPath: {
        type: String,
        required: true,
    },
    properties: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdvertProperty",
    },
}, {
    versionKey: false,
});

module.exports = mongoose.model("Advert", AdvertSchema);