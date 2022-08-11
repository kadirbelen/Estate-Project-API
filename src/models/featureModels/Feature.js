const mongoose = require("mongoose");
const FeatureCategory = require("./FeatureCategory");

const FeatureSchema = new mongoose.Schema({
    featureType: { type: String }, //iç özellik
    featureCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeatureCategory",
    }, ],
}, {
    versionKey: false,
});

module.exports = mongoose.model("Feature", FeatureSchema);