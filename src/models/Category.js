const mongoose = require("mongoose");
const PathPlugin = require("mongoose-mpath");

const CategorySchema = new mongoose.Schema({
    categoryName: { type: String },
}, {
    versionKey: false,
});

var pluginOperations = {
    pathSeparator: ",", // String used to separate ids in path
    onDelete: "REPARENT", // 'REPARENT' or 'DELETE'
    idType: mongoose.Schema.ObjectId, // Type used for model id
};

CategorySchema.plugin(PathPlugin, pluginOperations);

module.exports = mongoose.model("Category", CategorySchema);