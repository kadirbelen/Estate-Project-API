const mongoose = require("mongoose");

const LocationFeatureSchema = new mongoose.Schema({
    item: { type: String },
}, {
    versionKey: false,
});

module.exports = mongoose.model("LocationFeature", LocationFeatureSchema);