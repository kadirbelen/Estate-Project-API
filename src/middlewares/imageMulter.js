const multer = require("multer");
const errorResponse = require("../responses/errorResponse");
const statusCode = require("http-status-codes").StatusCodes;
const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

const imageUpload = async(req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            return errorResponse(
                res,
                statusCode.BAD_REQUEST,
                "Image size or format wrong"
            );
        }
        next();
    });
};

module.exports = imageUpload;