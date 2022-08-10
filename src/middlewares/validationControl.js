const validators = require("../utils/validation/validator");
const errorResponse = require("../responses/errorResponse");

module.exports = function(schema) {
    return function(req, res, next) {
        const { error } = validators[schema].validate(req.body);
        if (error) {
            errorResponse(res, 422, error.message);
            return;
        } else {
            next();
        }
    };
};