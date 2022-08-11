const genericController = require("../GenericController");
const Feature = require("../../models/featureModels/Feature");
const FeatureItem = require("../../models/featureModels/FeatureItem");
const FeatureCategory = require("../../models/featureModels/FeatureCategory");
const errorResponse = require("../../responses/errorResponse");
const successResponse = require("../../responses/succesResponse");
const statusCode = require("http-status-codes").StatusCodes;

const featurePost = async(req, res) => {
    await genericController.genericPost(req, res, Feature);
};

const featureUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, Feature);
};

const featureGet = async(req, res) => {
    try {
        var features = await Feature.find().populate("featureCategories");
        successResponse(res, statusCode.OK, features);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
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
    featurePost,
    featureUpdate,
    featureGet,
};