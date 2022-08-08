const genericController = require("../GenericController");
const Property = require("../../models/propertyModels/Property");
const PropertyItem = require("../../models/propertyModels/PropertyItem");
const PropertyCategory = require("../../models/propertyModels/PropertyCategory");

const propertyPost = async(req, res) => {
    await genericController.genericPost(req, res, Property);
};

const propertyUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, Property);
};

const propertyGet = async(req, res) => {
    try {
        var properties = await Property.find().populate({
            path: "propertyCategories",
            populate: {
                path: "propertyItems",
            },
        });
        res.json(properties);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// const propertyGet = async(req, res) => {
//     try {
//         var properties = await Property.aggregate([
//             { $match: { propertycategories: { $exists: true } } },
//             {
//                 $lookup: {
//                     from: "propertycategories",
//                     localField: "propertycategories",
//                     foreignField: "_id",
//                     as: "propertyObject",
//                 },
//             },
//         ]);
//         res.json(properties);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

module.exports = {
    propertyPost,
    propertyUpdate,
    propertyGet,
};