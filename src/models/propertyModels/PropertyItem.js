const mongoose = require("mongoose");
const PropertyCategory = require("./PropertyCategory");

const PropertyItemSchema = new mongoose.Schema({
    itemName: { type: String }, //AMERİKAN MUTFAK
}, {
    versionKey: false,
});

module.exports = mongoose.model("PropertyItem", PropertyItemSchema);