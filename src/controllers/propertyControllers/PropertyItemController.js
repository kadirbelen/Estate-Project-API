const genericController = require("../GenericController");
const PropertyItem = require("../../models/propertyModels/PropertyItem");
const PropertyCategory = require("../../models/propertyModels/PropertyCategory");

// const propertyItemPost = async(req, res) => {
//     await genericController.genericPost(req, res, PropertyItem);
// };

//category id params dan gelir
const propertyItemPost = async(req, res) => {
    try {
        const item = await PropertyItem.create(req.body);
        const property = await PropertyCategory.findByIdAndUpdate(
            req.params.id, { $push: { propertyItems: item._id } }, {
                new: true,
            }
        );
        item.save();
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const propertyItemUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, PropertyItem);
};

module.exports = {
    propertyItemPost,
    propertyItemUpdate,
};