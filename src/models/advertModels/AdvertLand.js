const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const AdvertBaseSchema = require("./AdvertBase");
const autopopulate = require("mongoose-autopopulate");
//??
const AdvertLandSchema = extendSchema(
    AdvertBaseSchema, {
        landStatus: { type: String, required: true },
        parcel: { type: Number },
        locationFeatures: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "LocationFeature",
            autopopulate: true,
        }, ],
    }, {
        versionKey: false,
        timestamps: true,
    }
);

AdvertLandSchema.plugin(autopopulate);
module.exports = mongoose.model("AdvertLand", AdvertLandSchema);