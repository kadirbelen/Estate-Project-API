const mongoose = require("mongoose");

const ExternalFeatureSchema = new mongoose.Schema(
    {
        item: { type: String },
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("ExternalFeature", ExternalFeatureSchema);
