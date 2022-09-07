const statusCode = require("http-status-codes").StatusCodes;
const jwt = require("jsonwebtoken");
const UserToken = require("../models/user-token");
const ApiError = require("../responses/error-response");

async function verifyToken(req, res, next) {
    try {
        const authorization = req.header("Authorization");
        if (!authorization) {
            console.log("deneme");
            return next(
                new ApiError("Acces denied.No token provided", statusCode.UNAUTHORIZED)
            );
        }

        const token = authorization.split(" ")[1];

        const tokenValid = await UserToken.findOne({ accesToken: token });

        if (!tokenValid) {
            return next(new ApiError("Token is not valid", statusCode.UNAUTHORIZED));
        }

        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (error, decoded) => {
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

module.exports = verifyToken;
