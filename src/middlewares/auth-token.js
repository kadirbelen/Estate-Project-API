const statusCode = require("http-status-codes").StatusCodes;
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const ApiError = require("../responses/error-response");

function verifyToken(req, res, next) {
    try {
        const authorization = req.header("Authorization");
        console.log("a", authorization);
        if (!authorization) {
            return next(
                new ApiError("Acces denied.No token provided", statusCode.UNAUTHORIZED)
            );
        }

        const token = authorization.split(" ")[1];

        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (error, decoded) => {
            console.log("decoded", decoded);
            console.log("error", error.message);
            if (error) {
                return next(new ApiError(error.message, statusCode.UNAUTHORIZED));
            }
            req.userId = decoded._id;
            next();
        });
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
}

function verifyAndAuthorizationToken(roles) {
    return (req, res, next) => {
        verifyToken(req, res, async () => {
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
        });
    };
}

module.exports = { verifyToken, verifyAndAuthorizationToken };
