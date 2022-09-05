const userSchema = require("./user");
const advertSchema = require("./advert");

const { loginSchema } = userSchema;
const { registerSchema } = userSchema;
const { passwordChangeSchema } = userSchema;

const { landSchema } = advertSchema;
const { workPlaceSchema } = advertSchema;
const { housingSchema } = advertSchema;

module.exports = {
    loginSchema,
    registerSchema,
    passwordChangeSchema,
    landSchema,
    workPlaceSchema,
    housingSchema,
};