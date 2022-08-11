const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/succesResponse");
const statusCode = require("http-status-codes").StatusCodes;

const genericPost = async(req, res, model) => {
    try {
        const newModel = new model(req.body);
        await newModel.save();
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericUpdate = async(req, res, model) => {
    try {
        const newModel = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericDelete = async(req, res) => {
    try {
        await model.findByIdAndRemove(req.params.id);
        successResponse(res, statusCode.OK, "ürün silindi");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = { genericDelete, genericPost, genericUpdate };