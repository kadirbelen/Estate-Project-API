const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const AdvertBaseSchema = require("./AdvertBase");
// const autopopulate = require("mongoose-autopopulate");

const AdvertHousingSchema = extendSchema(
    AdvertBaseSchema, {
        roomCount: { type: String, required: true },
        netSquareMeters: { type: Number, required: true },
        buildingAge: { type: String, required: true },
        floor: { type: Number, required: true },
        heatingType: { type: String, required: true },
        itemStatus: { type: String, required: true },
        interiorFeatures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "InteriorFeature",
            // autopopulate: true,
        }, ],
        externalFeatures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "ExternalFeature",
            // autopopulate: true,
        }, ],
        locationFeatures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "LocationFeature",
            // autopopulate: true,
        }, ],
    }, {
        versionKey: false,
        timestamps: true,
    }
);

// AdvertHousingSchema.plugin(autopopulate);
// AdvertHousingSchema.plugin(autopopulate, { functions: ["findOne"] });
const model = mongoose.model("AdvertHousing", AdvertHousingSchema);
module.exports = { model, AdvertHousingSchema };