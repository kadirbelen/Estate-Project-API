const errorResponse = require("../../responses/errorResponse");
const successResponse = require("../../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
const Advert = require("../../models/advertModels/Advert");
const genericController = require("../GenericController");
const mongoose = require("mongoose");

const advertGetById = async(req, res) => {
    try {
        const advert = await Advert.findOne({ advert: req.params.id }).populate(
            "advert"
        );
        successResponse(res, statusCode.OK, advert);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const advertUpdate = async(req, res) => {
    try {
        const advert = await Advert.findOne({ advert: req.params.id });
        const modelName = mongoose.model(advert.dynamicModel);
        await genericController.genericUpdate(req, res, modelName);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const advertDelete = async(req, res) => {
    try {
        const advert = await Advert.findOne({ advert: req.params.id });
        const modelName = mongoose.model(advert.dynamicModel);
        const isDelete = await modelName.findByIdAndRemove(req.params.id);
        if (!isDelete) {
            return errorResponse(res, statusCode.BAD_REQUEST, "İlan silinemedi");
        }
        const commonAdvert = await Advert.findByIdAndRemove(advert._id);
        successResponse(res, statusCode.OK, "ürün silindi");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

//pagination will be added
const advertGetAll = async(req, res) => {
    try {
        const advert = await Advert.find().populate("advert");
        var data = [];
        advert.map((item) => {
            const element = item.advert;
            data.push({
                images: element.images[0],
                title: element.title,
                price: element.price,
                address: element.address,
                squareMeters: element.squareMeters,
                date: element.createdAt,
                type: item.type,
            });
        });
        successResponse(res, statusCode.OK, data);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = { advertGetById, advertGetAll, advertUpdate, advertDelete };