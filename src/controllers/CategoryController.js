const Category = require("../models/Category");
const genericController = require("./GenericController");
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/succesResponse");
const statusCode = require("http-status-codes").StatusCodes;

const categoryPost = async(req, res) => {
    await genericController.genericPost(req.body, res, Category);
};

const categoryUpdate = async(req, res) => {
    await genericController.genericUpdate(req.body, res, Category);
};

const getSubCategory = async(req, res) => {
    try {
        /**
         * 1-Category_id gelir ve o category bulunur
         * 2-o category altındaki yapılar getirilir
         */
        const parent = await Category.findOne({ _id: req.params.id });
        const tree = await parent.getChildrenTree({
            options: { lean: false },
        });
        var array = [];
        tree.map((item) => {
            array.push({ id: item._id, categoryName: item.categoryName });
        });

        successResponse(res, statusCode.OK, array);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = { categoryPost, getSubCategory, categoryUpdate };