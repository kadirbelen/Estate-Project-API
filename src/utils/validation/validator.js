const authSchema = require("./authValidate");

const loginSchema = authSchema.loginSchema;
const registerSchema = authSchema.registerSchema;

module.exports = {
    loginSchema,
    registerSchema,
};