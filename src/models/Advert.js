const mongoose = require("mongoose");
const Category = require("./Category");

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
    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    categoryPath: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Advert", AdvertSchema);