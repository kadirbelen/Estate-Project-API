var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv/config");
const User = require("../models/User");
const UserToken = require("../models/UserToken");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../services/emailService");
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/succesResponse");
const statusCode = require("http-status-codes").StatusCodes;

const registerController = async(req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
        const user = new User({...req.body, password: hash });
        await user.save();
        const actionUrl = `${process.env.BASE_URL}/user/verify/${user.id}`;
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
        }
        const isValid = bcrypt.compareSync(password, user.password);
        console.log(isValid);
        if (!isValid) {
            errorResponse(res, statusCode.BAD_REQUEST, "Invalid email or password");
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
        if (!userToken) res.status(400).json({ error: "Token is not valid" });
        jwt.verify(
            req.body.refreshToken,
            process.env.JWT_REFRESH_TOKEN,
            (err, decoded) => {
                if (err) res.status(403).json({ error: "Token is not valid" });
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
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send("Invalid link");
        await User.findByIdAndUpdate(user._id, { verified: true });
        successResponse(
            res,
            statusCode.OK,
            "email doğrulandı sisteme giriş yapabilirsiniz"
        );
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const logOut = async(req, res) => {
    try {
        const userToken = await UserToken.findOne({
            refreshToken: req.body.refreshToken,
        });
        userToken.remove();
        successResponse(res, statusCode.OK, "Çıkış işlemi başarılı");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};
const userProfile = async(req, res) => {
    try {
        const userToken = await UserToken.findOne({
            accessToken: req.body.accessToken,
        });
        const user = await User.findOne({ _id: userToken.userId });
        successResponse(res, statusCode.OK, user);
    } catch (error) {}
};

module.exports = {
    loginController,
    registerController,
    refreshToken,
    logOut,
    emailVerification,
    userProfile,
};