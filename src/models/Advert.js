/* eslint-disable no-void */
const mongoose = require("mongoose");

const AdvertSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        populate: { select: "-password" },
    },
    images: [{
        remoteId: { type: String, required: true },
        url: { type: String, required: true },
        name: { type: String, required: true },
    }, ],
    title: { type: String, default: true, min: 10, max: 100 },
    description: { type: String, required: true, min: 30, max: 500 },
    price: { type: Number, required: true },
    squareMeters: { type: Number, required: true },
    categoryPath: { type: String, required: true },
    favoriteCount: { type: Number, default: 0 },
    type: { type: String, required: true },
    address: {
        city: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "City",
        },
        district: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "District",
        },
        town: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Town",
        },
    },
    interiorFeatures: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "InteriorFeature",
        default: void 0,
    },
    externalFeatures: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "ExternalFeature",
        default: void 0,
    },
    locationFeatures: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "LocationFeature",
        default: void 0,
    },
    roomCount: { type: String },
    netSquareMeters: { type: Number },
    buildingAge: { type: String },
    floor: { type: Number },
    heatingType: { type: String },
    itemStatus: { type: String },
    landStatus: { type: String },
    parcel: { type: Number },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("Advert", AdvertSchema);