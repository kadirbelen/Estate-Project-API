const statusCode = require("http-status-codes").StatusCodes;
const ApiError = require("../responses/error-response");

// eslint-disable-next-line no-unused-vars
const ErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        console.log("denemee");
        return res
            .status(err.statusCode || statusCode.INTERNAL_SERVER_ERROR)
            .json(err.toJSON());
    }

    return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
        error: {
            message: "Internal Server Error",
        },
        success: false,
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
    });
};

module.exports = ErrorHandler;
