const userSchema = require("./userValidate");
const advertSchema = require("./advertValidate");

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
