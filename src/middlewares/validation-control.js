const statusCode = require("http-status-codes").StatusCodes;
const validators = require("../utils/validation/validator");
const ApiError = require("../responses/error-response");

module.exports = function (schema) {
    return function (req, res, next) {
        const { error } = validators[schema].validate(req.body);
        if (error) {
            return next(new ApiError(error.message, statusCode.UNPROCESSABLE_ENTITY));
        } else {
            next();
        }
    };
};
