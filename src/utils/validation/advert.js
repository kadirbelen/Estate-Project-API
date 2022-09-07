const Joi = require("@hapi/joi");

const advertSchema = Joi.object().keys({
    images: Joi.array().min(3).max(15).items(Joi.string()),
    title: Joi.string().required().min(10).max(100),
    description: Joi.string().required().min(30).max(500),
    price: Joi.number().required(),
    squareMeters: Joi.number().required(),
    categoryPath: Joi.string().required(),
    type: Joi.string().required(),
    address: Joi.object().keys({
        city: Joi.string().required(),
        district: Joi.string().required(),
        town: Joi.string().required(),
    }),
});

const landSchema = advertSchema.keys({
    landStatus: Joi.string().required(),
    parcel: Joi.number(),
    locationFeatures: Joi.allow(),
});

const housingSchema = advertSchema.keys({
    roomCount: Joi.string().required(),
    netSquareMeters: Joi.number().required(),
    buildingAge: Joi.string().required(),
    floor: Joi.number().required(),
    heatingType: Joi.string().required(),
    itemStatus: Joi.string().required(),
    interiorFeatures: Joi.allow(),
    externalFeatures: Joi.allow(),
    locationFeatures: Joi.allow(),
});

const workPlaceSchema = advertSchema.keys({
    roomCount: Joi.string().required(),
    netSquareMeters: Joi.number().required(),
    buildingAge: Joi.string().required(),
    floor: Joi.number().required(),
    heatingType: Joi.string().required(),
    itemStatus: Joi.string().required(),
    interiorFeatures: Joi.allow(),
    externalFeatures: Joi.allow(),
    locationFeatures: Joi.allow(),
});

module.exports = { housingSchema, landSchema, workPlaceSchema };
