const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
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

const genericDelete = async(req, res) => {
    try {
        await model.findByIdAndRemove(req.params.id);
        successResponse(res, statusCode.OK, "ürün silindi");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const genericAdvertPost = async(req, res, model) => {
    const images = [];
    try {
        for (let i = 0; i < req.files.length; i++) {
            images.push({ path: req.files[i].path });
        }
        const advert = new model({...req.body, images: images });
        if (!advert) {
            images.map((item) => {
                fs.unlinkSync(item.path);
            });
        }
        await advert.save();
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