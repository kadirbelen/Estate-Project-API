const userSchema = require("./userValidate");
const advertSchema = require("./advertValidate");

const loginSchema = userSchema.loginSchema;
const registerSchema = userSchema.registerSchema;
const passwordChangeSchema = userSchema.passwordChangeSchema;

const landSchema = advertSchema.landSchema;
const workPlaceSchema = advertSchema.workPlaceSchema;
const housingSchema = advertSchema.housingSchema;

module.exports = {
    loginSchema,
    registerSchema,
    passwordChangeSchema,
    landSchema,
    workPlaceSchema,
    housingSchema,
};