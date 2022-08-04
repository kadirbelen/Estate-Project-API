const Joi = require("@hapi/joi");

const categorySchema = Joi.object({
    categoryName: Joi.string().required().min(3).max(50),
});

module.exports = categorySchema;