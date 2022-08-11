const genericController = require("../GenericController");
const FeatureItem = require("../../models/featureModels/FeatureItem");
const FeatureCategory = require("../../models/featureModels/FeatureCategory");
const errorResponse = require("../../responses/errorResponse");
const successResponse = require("../../responses/succesResponse");
const statusCode = require("http-status-codes").StatusCodes;

// const propertyItemPost = async(req, res) => {
//     await genericController.genericPost(req, res, PropertyItem);
// };

//category id params dan gelir
const featureItemPost = async(req, res) => {
    try {
        const item = await FeatureItem.create(req.body);
        const feature = await FeatureCategory.findByIdAndUpdate(
            req.params.id, { $push: { featureItems: item._id } }, {
                new: true,
            }
        );
        item.save();
        successResponse(res, statusCode.OK, item);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const featureItemUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, FeatureItem);
};

module.exports = {
    featureItemPost,
    featureItemUpdate,
};