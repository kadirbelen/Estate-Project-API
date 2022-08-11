const validators = require("../utils/validation/validator");
const errorResponse = require("../responses/errorResponse");
const statusCode = require("http-status-codes").StatusCodes;

module.exports = function(schema) {
    return function(req, res, next) {
        const { error } = validators[schema].validate(req.body);
        if (error) {
            errorResponse(res, statusCode.UNPROCESSABLE_ENTITY, error.message);
            return;
        } else {
            next();
        }
    };
};