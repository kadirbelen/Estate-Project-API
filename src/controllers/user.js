const statusCode = require("http-status-codes").StatusCodes;
const ApiError = require("../responses/error-response");
const successResponse = require("../responses/success-response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserToken = require("../models/user-token");
const generateToken = require("../utils/generate-token");
const sendEmail = require("../services/email");
const genericController = require("./generic");

const registerController = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User({ ...req.body, password: hash });
        await user.save();

        const emailToken = await generateToken.emailGenerateToken(user);

        const actionUrl = `${process.env.BASE_URL}users/verify/${emailToken}`;
        await sendEmail(user, "Email Doğrulama", actionUrl);

        successResponse(res, statusCode.OK, user);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.verified === false) {
            return next(
                new ApiError(
                    "Invalid email or email not verified",
                    statusCode.BAD_REQUEST
                )
            );
        }
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return next(
                new ApiError("Invalid email or password", statusCode.BAD_REQUEST)
            );
        }
        const token = await generateToken.generateToken(user);
        successResponse(res, statusCode.OK, token);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const userToken = await UserToken.findOne({
            refreshToken: req.body.refreshToken,
        });
        if (!userToken) {
            return next(new ApiError("Token is not valid", statusCode.BAD_REQUEST));
        }
        jwt.verify(
            req.body.refreshToken,
            process.env.JWT_REFRESH_TOKEN,
            (err, decoded) => {
                if (err) {
                    return next(
                        new ApiError("Token is not valid", statusCode.BAD_REQUEST)
                    );
                }
                const payload = { _id: decoded._id };
                const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
                    expiresIn: "1h",
                });
                successResponse(res, statusCode.OK, { accessToken });
            }
        );
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const emailVerification = async (req, res, next) => {
    try {
        let userId;
        console.log("token", req.params.token);
        jwt.verify(req.params.token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                return next(new ApiError("Token is not valid", statusCode.BAD_REQUEST));
            }
            userId = decoded._id;
        });
        await User.findByIdAndUpdate(userId, { verified: true });
        successResponse(
            res,
            statusCode.OK,
            "email doğrulandı sisteme giriş yapabilirsiniz"
        );
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const logout = async (req, res, next) => {
    try {
        await UserToken.findOneAndRemove({
            userId: req.userId,
        });
        successResponse(res, statusCode.OK, "Çıkış işlemi başarılı");
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const userProfile = async (req, res, next) => {
    try {
        const data = await genericController.genericGetByQueryPopulate(
            User,
            { _id: req.userId },
            {
                path: "favorities",
                select: {
                    images: { $slice: ["$images", 1] },
                    title: 1,
                    price: 1,
                    address: 1,
                    squareMeters: 1,
                    type: 1,
                    createdAt: 1,
                },
                populate: {
                    path: "address.city address.town address.district",
                },
            }
        );

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const userUpdate = async (req, res, next) => {
    try {
        const data = await genericController.genericUpdate(req.userId, req.body, User);

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const userPasswordUpdate = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const data = await genericController.genericGetByQueryId(User, req.userId);

        const isValid = bcrypt.compareSync(oldPassword, data.password);
        if (!isValid) {
            return next(
                new ApiError("Old password is not valid", statusCode.BAD_REQUEST)
            );
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);

        const updateUser = await genericController.genericUpdate(
            req.userId,
            { password: hash },
            User
        );

        successResponse(res, statusCode.OK, updateUser);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

module.exports = {
    loginController,
    registerController,
    refreshToken,
    logout,
    emailVerification,
    userProfile,
    userUpdate,
    userPasswordUpdate,
};
