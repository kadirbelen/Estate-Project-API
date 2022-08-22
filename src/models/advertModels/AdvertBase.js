const mongoose = require("mongoose");
// const autopopulate = require("mongoose-autopopulate");
//??
const AdvertBaseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        autopopulate: true,
    },
    images: [{
        path: { type: String, required: true },
    }, ],
    title: { type: String, default: true, min: 10, max: 100 },
    description: { type: String, required: true, min: 30, max: 500 },
    price: { type: Number, required: true },
    squareMeters: { type: Number, required: true },
    categoryPath: { type: String },
    address: {
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
            autopopulate: true,
        },
        district: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "District",
            autopopulate: true,
        },
        town: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Town",
            autopopulate: true,
        },
    },
}, {
    versionKey: false,
});
// AdvertBaseSchema.plugin(autopopulate);
module.exports = AdvertBaseSchema;