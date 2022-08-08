const genericController = require("../GenericController");
const PropertyCategory = require("../../models/propertyModels/PropertyCategory");
const Property = require("../../models/propertyModels/Property");

//yeni özellik kategorisi eklendi
const propertyCategoryPost = async(req, res) => {
    try {
        const category = await PropertyCategory.create(req.body); //Information=yeni özellik category eklendi
        //Information=propery update edildi
        const property = await Property.findByIdAndUpdate(
            req.params.id, { $push: { propertyCategories: category._id } }, {
                new: true,
            }
        );
        category.save();
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const propertyCategoryUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, PropertyCategory);
};

module.exports = {
    propertyCategoryPost,
    propertyCategoryUpdate,
};