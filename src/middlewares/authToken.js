const jwt = require("jsonwebtoken");
const User = require("../models/User");
const errorResponse = require("../responses/errorResponse");
const statusCode = require("http-status-codes").StatusCodes;

function verifyToken(req, res, next) {
    try {
        const authorization = req.header("Authorization");

        if (!authorization) {
            errorResponse(
                res,
                statusCode.UNAUTHORIZED,
                "Access denied. No token provided."
            );
            return;
        }

        const token = authorization.split(" ")[1];
        console.log(token);
        jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
            console.log("decoded", decoded);
            if (err) {
                errorResponse(res, statusCode.UNAUTHORIZED, err.message);
                return;
            }
            req.userId = decoded._id;
            next();
        });
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
}

function verifyAndAuthorizationToken(roles) {
    try {
        console.log("roles", roles);
        return (req, res, next) => {
            verifyToken(req, res, async() => {
                const user = await User.findById(req.userId);
                console.log("user", user);

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].includes(user.role)) {
                        next();
                    } else {
                        errorResponse(
                            res,
                            statusCode.FORBIDDEN,
                            "You don't have permission for this action"
                        );
                    }
                }
                //                 if (user.role.includes(roles)) {
                //                     next();
                //                 } else {
                //                     errorResponse(
                //                         res,
                //                         statusCode.FORBIDDEN,
                //                         "You don't have permission for this action"
                //                     );
                //                 }
            });
        };
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
}

module.exports = { verifyToken, verifyAndAuthorizationToken };

// for (let i = 0; i < roles.length; i++) {
//     if (roles[i].includes(user.role)) {
//         next();
//     } else {
//         errorResponse(
//             res,
//             statusCode.FORBIDDEN,
//             "You don't have permission for this action"
//         );
//     }
// }