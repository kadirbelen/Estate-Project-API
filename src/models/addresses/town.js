const mongoose = require("mongoose");

const TownSchema = new mongoose.Schema({
    name: { type: String, required: true },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "District",
    },
});

module.exports = mongoose.model("Town", TownSchema);
