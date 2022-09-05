const statusCode = require("http-status-codes").StatusCodes;
const errorResponse = require("../responses/error-response");
const successResponse = require("../responses/success-response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const UserToken = require("../models/user-token");
const generateToken = require("../utils/generate-token");
const sendEmail = require("../services/email");
const genericController = require("./generic");

const registerController = async(req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const user = new User({...req.body, password: hash });
        await user.save();

        const { emailToken, error } = await generateToken.emailGenerateToken(user);
        console.log("t", emailToken);
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        const actionUrl = `${process.env.BASE_URL}users/verify/${emailToken}`;

        await sendEmail(user, "Email Doğrulama", actionUrl);
        successResponse(res, statusCode.OK, user);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const loginController = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.verified === false) {
            errorResponse(
                res,
                statusCode.BAD_REQUEST,
                "Invalid email or email not verified"
            );
            return;
        }
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            errorResponse(res, statusCode.BAD_REQUEST, "Invalid email or password");
            return;
        }
        const token = await generateToken.generateToken(user);
        successResponse(res, statusCode.OK, token);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const refreshToken = async(req, res) => {
    try {
        const userToken = await UserToken.findOne({
            refreshToken: req.body.refreshToken,
        });
        if (!userToken) {
            errorResponse(res, statusCode.BAD_REQUEST, "Token is not valid");
            return;
        }
        jwt.verify(
            req.body.refreshToken,
            process.env.JWT_REFRESH_TOKEN,
            (err, decoded) => {
                if (err) {
                    errorResponse(res, statusCode.BAD_REQUEST, "Token is not valid");
                    return;
                }
                const payload = { _id: decoded._id };
                const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
                    expiresIn: "1h",
                });
                successResponse(res, statusCode.OK, { accessToken });
            }
        );
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const emailVerification = async(req, res) => {
    try {
        let userId;
        console.log("token", req.params.token);
        jwt.verify(req.params.token, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
            console.log("decoded", decoded);
            if (err) {
                errorResponse(res, statusCode.BAD_REQUEST, "Token is not valid");
                return;
            }
            userId = decoded._id;
        });
        console.log("id", userId);
        await User.findByIdAndUpdate(userId, { verified: true });
        successResponse(
            res,
            statusCode.OK,
            "email doğrulandı sisteme giriş yapabilirsiniz"
        );
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const logout = async(req, res) => {
    try {
        const userToken = await UserToken.findOne({
            userId: req.userId,
        });
        userToken.remove();
        successResponse(res, statusCode.OK, "Çıkış işlemi başarılı");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};
// select: "images title price address squareMeters type createdAt",
// const user = await User.findOne({ _id: req.userId }).populate({
//     path: "favorities",
//     select: {
//         images: { $slice: ["$images", 1] },
//         title: 1,
//         price: 1,
//         address: 1,
//         squareMeters: 1,
//         type: 1,
//         createdAt: 1,
//     },
//     populate: {
//         path: "address.city address.town address.district",
//     },
// });
const userProfile = async(req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId }).populate({
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
        });
        successResponse(res, statusCode.OK, user);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const userUpdate = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericUpdate(
            req.userId,
            req.body,
            User
        );
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const userPasswordUpdate = async(req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const user = await User.findOne({ _id: req.userId });
        console.log("id", req.userId);
        const isValid = bcrypt.compareSync(oldPassword, user.password);
        console.log(isValid);
        if (!isValid) {
            errorResponse(res, statusCode.BAD_REQUEST, "old password is not valid");
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        const updateUser = await User.findByIdAndUpdate(req.userId, {
            password: hash,
        });

        successResponse(res, statusCode.OK, updateUser);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
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