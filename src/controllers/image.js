const statusCode = require("http-status-codes").StatusCodes;
const ApiError = require("../responses/error-response");
const successResponse = require("../responses/success-response");
const ImageTemporary = require("../models/image-temporary");
const driveService = require("../services/google-drive");
const genericController = require("./generic");

const imagePost = async (req, res, next) => {
    try {
        const image = await driveService.publicUrl(req, res);
        const temporary = await genericController.genericPost(image, ImageTemporary);

        successResponse(res, statusCode.OK, { remoteId: temporary.remoteId });
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const imageDelete = async (req, res, next) => {
    try {
        console.log("idi", req.params.remoteId);
        await driveService.deleteFile(req.params.remoteId, res);
        await ImageTemporary.findOneAndRemove({
            remoteId: req.params.remoteId,
        });
        successResponse(res, statusCode.OK);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

module.exports = {
    imagePost,
    imageDelete,
};
