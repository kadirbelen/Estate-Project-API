const mongoose = require("mongoose");

const InteriorFeatureSchema = new mongoose.Schema(
    {
        item: { type: String },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("InteriorFeature", InteriorFeatureSchema);
