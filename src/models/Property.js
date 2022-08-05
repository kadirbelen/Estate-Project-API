const mongoose = require("mongoose");
const Advert = require("./Advert");

const PropertySchema = new mongoose.Schema({
    properties: [{
        propertyType: { type: String }, //iç özeliikler
        propertyItems: [{
            name: { type: String }, //Mutfak
            items: [], //Amerikan Mutfak....
        }, ],
    }, ],
});

module.exports = mongoose.model("Property", PropertySchema);