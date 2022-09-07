const statusCode = require("http-status-codes").StatusCodes;
const multer = require("multer");
const ApiError = require("../responses/error-response");

const upload = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
}).single("image");

const imageUpload = async (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            return next(
                new ApiError("Image size or format wrong", statusCode.BAD_REQUEST)
            );
        }
        return next();
    });
};

module.exports = imageUpload;
