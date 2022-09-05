const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
    },
});

module.exports = mongoose.model("District", DistrictSchema);