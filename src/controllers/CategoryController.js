const statusCode = require("http-status-codes").StatusCodes;
const Category = require("../models/Category");
const genericController = require("./GenericController");
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");

const categoryPost = async(req, res) => {
    await genericController.genericPost(req, res, Category);
};

const categoryUpdate = async(req, res) => {
    await genericController.genericUpdate(
        req.params.id,
        req.body,
        res,
        Category
    );
};

const getSubCategory = async(req, res) => {
    try {
        /**
         * 1-Category_id gelir ve o category bulunur
         * 2-o category altındaki diğer kategoriler getirilir
         */
        const parent = await Category.findOne({
            _id: "62fc9366a33fe6e0a145ea38"
        });
        const tree = await parent.getChildrenTree({
            options: { lean: false }
        });
        successResponse(res, statusCode.OK, tree);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = { categoryPost, getSubCategory, categoryUpdate };