const mongoose = require("mongoose");
const extendSchema = require("mongoose-extend-schema");
const AdvertHousingSchema = require("./AdvertHousing").AdvertHousingSchema;
//??
const AdvertWorkPlaceSchema = extendSchema(
    AdvertHousingSchema, {}, {
        versionKey: false,
    }
);

module.exports = mongoose.model("AdvertWorkPlace", AdvertWorkPlaceSchema);