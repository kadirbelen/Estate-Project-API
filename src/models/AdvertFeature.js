const mongoose = require("mongoose");

const AdvertFeatureSchema = new mongoose.Schema({
    featureType: { type: String }, //iç özellik
    featureCategories: [{
        featureName: { type: String }, //mutfak
        featureItems: [{
            itemName: { type: String }, //
        }, ],
    }, ],
}, {
    versionKey: false,
});

module.exports = mongoose.model("AdvertFeature", AdvertFeatureSchema);