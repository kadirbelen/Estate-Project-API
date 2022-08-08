const mongoose = require("mongoose");

const AdvertPropertySchema = new mongoose.Schema({
    propertyType: { type: String },
    propertyCategories: [{
        categoryName: { type: String },
        propertyItems: [{
            itemName: { type: String },
        }, ],
    }, ],
}, {
    versionKey: false,
});

module.exports = mongoose.model("AdvertProperty", AdvertPropertySchema);