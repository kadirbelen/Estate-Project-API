const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
const Advert = require("../models/advertModels/Advert");
var fs = require("fs");

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
    const images = [];
    try {
        console.log("req", req);
        console.log("body", req.body);
        console.log("files", req.files);
        req.files.map((item) => {
            images.push({ path: item.path });
        });
        const advert = new model({
            ...req.body,
            images: images,
            user: req.userId,
        });
        if (!advert) {
            images.map((item) => {
                fs.unlinkSync(item.path);
            });
            return errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        await advert.save();
        const baseAdvert = new Advert({
            advert: advert._id,
            type: type,
            dynamicModel: ref,
        });
        await baseAdvert.save();
        successResponse(res, statusCode.OK, advert);
    } catch (error) {
        images.map((item) => {
            console.log("p", item.path);
            fs.unlinkSync(item.path);
        });
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
};