const mongoose = require("mongoose");
const PropertyCategory = require("../propertyModels/PropertyCategory");

const PropertySchema = new mongoose.Schema({
    propertyType: { type: String },
    propertyCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PropertyCategory",
    }, ],
}, {
    versionKey: false,
});

module.exports = mongoose.model("Property", PropertySchema);