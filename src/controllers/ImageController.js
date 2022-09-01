const ImageTemporary = require("../models/ImageTemporary");
const driveService = require("../services/googleDriveService");
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;

const imagePost = async(req, res) => {
    try {
        const image = await driveService.publicUrl(req, res);
        console.log("i", image);
        const temporary = new ImageTemporary(image);
        temporary.save();
        successResponse(res, statusCode.OK, { remoteId: temporary.remoteId });
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const imageDelete = async(req, res) => {
    try {
        console.log("idi", req.params.remoteId);
        await driveService.deleteFile(req.params.remoteId, res);
        await ImageTemporary.findOneAndRemove({
            remoteId: req.params.remoteId,
        });
        successResponse(res, statusCode.OK);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = {
    imagePost,
    imageDelete,
};