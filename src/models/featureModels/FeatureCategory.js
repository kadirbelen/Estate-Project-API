const mongoose = require("mongoose");
const FeatureItem = require("./FeatureItem");

const FeatureCategorySchema = new mongoose.Schema({
    featureName: { type: String }, //MUTFAK
    featureItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "FeatureItem",
    }, ],
}, {
    versionKey: false,
});

module.exports = mongoose.model("FeatureCategory", FeatureCategorySchema);
// propertyItems: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "PropertyItem",
// }, ],