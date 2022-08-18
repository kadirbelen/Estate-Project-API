const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const AdvertBaseSchema = require("./AdvertBase");
//??
const AdvertLandSchema = extendSchema(
    AdvertBaseSchema, {
        squareMeters: { type: Number },
        landStatus: { type: String },
        parcel: { type: Number },
        locationFeatures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "LocationFeature",
        }, ],
    }, {
        versionKey: false,
    }
);

module.exports = mongoose.model("AdvertLand", AdvertLandSchema);