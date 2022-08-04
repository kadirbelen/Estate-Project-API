const mongoose = require("mongoose");
const PathPlugin = require("mongoose-mpath");

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String },
});

CategorySchema.plugin(PathPlugin);

module.exports = mongoose.model("Category", CategorySchema);