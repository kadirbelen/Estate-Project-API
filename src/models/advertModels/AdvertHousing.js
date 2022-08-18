const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const AdvertBaseSchema = require("./AdvertBase");

const AdvertHousingSchema = extendSchema(
    AdvertBaseSchema, {
        roomCount: { type: String, required: true },
        grossSquareMeters: { type: Number, required: true },
        netSquareMeters: { type: Number, required: true },
        buildingAge: { type: Number, required: true },
        floor: { type: Number, required: true },
        heatingType: { type: String, required: true },
        itemStatus: { type: String },
        interiorFeatures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "InteriorFeature",
        }, ],
        externalFeatures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExternalFeature",
        }, ],
        locationFeatures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "LocationFeature",
        }, ],
    }, {
        versionKey: false,
    }
);
const model = mongoose.model("AdvertHousing", AdvertHousingSchema);
module.exports = { model, AdvertHousingSchema };