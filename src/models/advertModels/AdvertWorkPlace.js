const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const AdvertHousingSchema = require("./AdvertHousing").AdvertHousingSchema;
const autopopulate = require("mongoose-autopopulate");
//??
const AdvertWorkPlaceSchema = extendSchema(
    AdvertHousingSchema, {}, {
        versionKey: false,
        timestamps: true,
    }
);
AdvertWorkPlaceSchema.plugin(autopopulate);
module.exports = mongoose.model("AdvertWorkPlace", AdvertWorkPlaceSchema);