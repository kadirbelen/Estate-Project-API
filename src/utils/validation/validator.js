const userSchema = require("./userValidate");

const loginSchema = userSchema.loginSchema;
const registerSchema = userSchema.registerSchema;
const passwordChangeSchema = userSchema.passwordChangeSchema;

module.exports = {
    loginSchema,
    registerSchema,
    passwordChangeSchema,
};