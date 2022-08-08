const mongoose = require("mongoose");
const Property = require("./Property");
const PropertyItem = require("./PropertyItem");

const PropertyCategorySchema = new mongoose.Schema({
    categoryName: { type: String }, //MUTFAK
    propertyItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "PropertyItem",
    }, ],
}, {
    versionKey: false,
});

module.exports = mongoose.model("PropertyCategory", PropertyCategorySchema);