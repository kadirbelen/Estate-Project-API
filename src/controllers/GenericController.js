const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
const Advert = require("../models/advertModels/Advert");
const ImageTemporary = require("../models/ImageTemporary");

const genericGet = async(req, res, model) => {
    try {
        const newModel = await model.find();
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericGetByQuery = async(req, res, model, query) => {
    try {
        const newModel = await model.find(query);
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericGetByQueryPopulate = async(req, res, model, query, populate) => {
    try {
        const newModel = await model.find(query).populate(populate);
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericGetByQueryPopulateWithSelect = async(
    req,
    res,
    model,
    query,
    populate,
    select
) => {
    try {
        const newModel = await model.find(query).populate(populate).select(select);
        return newModel;
    } catch (error) {
        console.log(error);
    }
};

const genericPost = async(req, res, model) => {
    try {
        const newModel = new model(req.body);
        await newModel.save();
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericUpdate = async(req, res, model) => {
    try {
        const newModel = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericDelete = async(req, res, model) => {
    try {
        await model.findByIdAndRemove(req.params.id);
        successResponse(res, statusCode.OK, "ürün silindi");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericAdvertPost = async(req, res, model, ref, type) => {
    try {
        var images = [];
        for (const item of req.body.images) {
            const temporary = await ImageTemporary.findOne({ remoteId: item });
            if (!temporary) {
                return errorResponse(
                    res,
                    statusCode.BAD_REQUEST,
                    `${item} Image not defined`
                );
            }
            images.push({
                remoteId: temporary.remoteId,
                url: temporary.url,
                name: temporary.name,
            });
            await ImageTemporary.findByIdAndRemove(temporary._id);
        }
        const advert = new model({
            ...req.body,
            images: images,
            user: req.userId,
        });
        await advert.save();
        const baseAdvert = new Advert({
            advert: advert._id,
            type: type,
            dynamicModel: ref,
        });
        await baseAdvert.save();
        successResponse(res, statusCode.OK, advert);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = {
    genericDelete,
    genericPost,
    genericUpdate,
    genericGet,
    genericAdvertPost,
    genericGetByQuery,
    genericGetByQueryPopulate,
    genericGetByQueryPopulateWithSelect,
};