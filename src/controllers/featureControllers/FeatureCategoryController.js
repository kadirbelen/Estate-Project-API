const genericController = require("../GenericController");
const FeatureCategory = require("../../models/featureModels/FeatureCategory");
const Feature = require("../../models/featureModels/Feature");
const errorResponse = require("../../responses/errorResponse");
const successResponse = require("../../responses/succesResponse");
const statusCode = require("http-status-codes").StatusCodes;

//yeni özellik kategorisi eklendi
const featureCategoryPost = async(req, res) => {
    try {
        const category = await FeatureCategory.create(req.body); //Information=yeni özellik category eklendi
        //Information=propery update edildi
        const feature = await Feature.findByIdAndUpdate(
            req.params.id, { $push: { featureCategories: category._id } }, {
                new: true,
            }
        );
        category.save();
        successResponse(res, statusCode.OK, category);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const featureCategoryUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, FeatureCategory);
};

module.exports = {
    featureCategoryPost,
    featureCategoryUpdate,
};