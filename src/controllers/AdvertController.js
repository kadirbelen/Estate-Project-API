const AdvertHousing = require("../models/advertModels/AdvertHousing").model;
const AdvertLand = require("../models/advertModels/AdvertLand");
const AdvertWorkPlace = require("../models/advertModels/AdvertWorkPlace");
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
const Advert = require("../models/advertModels/Advert");
const genericController = require("./GenericController");
const mongoose = require("mongoose");

const advertHousingPost = async(req, res) => {
    await genericController.genericAdvertPost(
        req,
        res,
        AdvertHousing,
        "AdvertHousing",
        "Konut"
    );
};

const advertLandPost = async(req, res) => {
    await genericController.genericAdvertPost(
        req,
        res,
        AdvertLand,
        "AdvertLand",
        "Arsa"
    );
};

const advertWorkPlacePost = async(req, res) => {
    await genericController.genericAdvertPost(
        req,
        res,
        AdvertWorkPlace,
        "AdvertWorkPlace",
        "İş Yeri"
    );
};

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

const advertGetByCategory = async(req, res) => {
    try {
        const advert = await Advert.find({}).populate({
            path: "advert",
        });
        var regex = new RegExp(`\^${req.params.categoryPath}`);
        var result = advert.filter((item) => item.advert.categoryPath.match(regex));
        successResponse(res, statusCode.OK, result);
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
        await Advert.findByIdAndRemove(advert._id);
        successResponse(res, statusCode.OK, "İlan silindi");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

//pagination will be added
const advertGetAll = async(req, res) => {
    try {
        const advert = await Advert.find().populate("advert");
        console.log("adv", advert);
        var data = [];
        advert.map((item) => {
            const element = item.advert;
            data.push({
                id: element._id,
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

module.exports = {
    advertHousingPost,
    advertLandPost,
    advertWorkPlacePost,
    advertGetById,
    advertGetAll,
    advertUpdate,
    advertDelete,
    advertGetByCategory,
};