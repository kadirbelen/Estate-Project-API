var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
require("dotenv/config");
const User = require("../models/User");
const UserToken = require("../models/UserToken");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../services/emailService");

const registerController = async(req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try {
        const user = new User({...req.body, password: hash });
        await user.save();
        const actionUrl = `${process.env.BASE_URL}/user/verify/${user.id}`;
        await sendEmail(user, "Email Doğrulama", actionUrl);
        res.json({ message: "Email sent to your account please verify" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginController = async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user || user.verified === false) {
            res.status(400).send({ message: "Invalid email or email not verified" });
            return;
        }
        const isValid = bcrypt.compareSync(password, user.password);
        console.log(isValid);
        if (!isValid) {
            res.status(400).send({ message: "Invalid email or password" });
            return;
        }
        const token = await generateToken(user);
        res.json({
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            err: token.err,
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
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
                res.json({ accessToken: accessToken });
            }
        );
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const emailVerification = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send("Invalid link");
        await User.findByIdAndUpdate(user._id, { verified: true });
        res.json({ message: "email doğrulandı sisteme giriş yapabilirsiniz" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const logOut = async(req, res) => {
    try {
        const userToken = await UserToken.findOne({
            refreshToken: req.body.refreshToken,
        });

        userToken.remove();
        res.json({ message: "Çıkış işlemi başarılı" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    loginController,
    registerController,
    refreshToken,
    logOut,
    emailVerification,
};