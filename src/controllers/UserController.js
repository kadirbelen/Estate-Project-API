var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserToken = require("../models/UserToken");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../services/emailService");
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
const genericController = require("./GenericController");

const registerController = async(req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const user = new User({...req.body, password: hash });
        await user.save();
        const actionUrl = `${process.env.BASE_URL}user/verify/${user.id}`;
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
        console.log("ps", password);
        console.log("up", user.password);
        console.log(isValid);
        if (!isValid) {
            errorResponse(res, statusCode.BAD_REQUEST, "Invalid email or password");
            return;
        }
        const token = await generateToken(user);
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
                successResponse(res, statusCode.OK, { accessToken: accessToken });
            }
        );
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const emailVerification = async(req, res) => {
    try {
        //TODO:Gereksiz query
        // const user = await User.findById(req.params.id);
        // if (!user)
        //     return errorResponse(res, statusCode.BAD_REQUEST, "Invalid link");
        await User.findByIdAndUpdate(req.params.id, { verified: true });
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
////????
const userUpdate = async(req, res) => {
    await genericController.genericUpdate(req.userId, req.body, res, User);
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