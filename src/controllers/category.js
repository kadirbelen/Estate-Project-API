const statusCode = require("http-status-codes").StatusCodes;
const ApiError = require("../responses/error-response");
const successResponse = require("../responses/success-response");
const Category = require("../models/category");
const genericController = require("./generic");

const categoryPost = async (req, res, next) => {
    try {
        const data = await genericController.genericPost(req.body, Category);

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const categoryUpdate = async (req, res, next) => {
    try {
        const data = await genericController.genericUpdate(
            req.params.id,
            req.body,
            Category
        );

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const getSubCategory = async (req, res, next) => {
    try {
        /**
         * 1-Category_id gelir ve o category bulunur
         * 2-o category altındaki diğer kategoriler getirilir
         */
        const parent = await Category.findOne({
            _id: "62fc9366a33fe6e0a145ea38",
        });
        const tree = await parent.getChildrenTree({
            options: { lean: false },
        });
        successResponse(res, statusCode.OK, tree);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

module.exports = { categoryPost, getSubCategory, categoryUpdate };
