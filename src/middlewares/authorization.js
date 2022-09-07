const statusCode = require("http-status-codes").StatusCodes;
const User = require("../models/user");
const ApiError = require("../responses/error-response");

const verifyAndAuthorizationToken = (roles) => async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        console.log("user", user);

        const role = roles.every((item) => item.includes(user.role));
        if (role) {
            next();
        } else {
            return next(
                new ApiError(
                    "You don't have permission for this action",
                    statusCode.FORBIDDEN
                )
            );
        }
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

module.exports = verifyAndAuthorizationToken;
