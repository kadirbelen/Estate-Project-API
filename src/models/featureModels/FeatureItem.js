const mongoose = require("mongoose");

const FeatureItemSchema = new mongoose.Schema({
    itemName: { type: String },
}, {
    versionKey: false,
});

module.exports = mongoose.model("FeatureItem", FeatureItemSchema);