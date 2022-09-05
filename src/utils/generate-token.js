const jwt = require("jsonwebtoken");
require("dotenv/config");
const UserToken = require("../models/user-token");

const generateToken = async(user) => {
    try {
        const payload = { _id: user._id };
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: "1h",
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: "24h",
        });

        const userToken = await UserToken.findOne({ userId: user._id });
        if (userToken) await userToken.remove();

        await new UserToken({
            userId: user._id,
            accessToken,
            refreshToken,
        }).save();

        return { accessToken, refreshToken };
    } catch (err) {
        return { err };
    }
};

module.exports = generateToken;