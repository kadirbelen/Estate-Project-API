const AdvertHousing = require("../models/advertModels/AdvertHousing").model;
const AdvertLand = require("../models/advertModels/AdvertLand");
const AdvertWorkPlace = require("../models/advertModels/AdvertWorkPlace");
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
const Advert = require("../models/advertModels/Advert");
const genericController = require("./GenericController");
const mongoose = require("mongoose");
const pagination = require("../utils/pagination");

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
    await genericController.genericGetByQueryPopulate(
        req,
        res,
        Advert, {
            advert: req.params.id,
        }, ["advert"]
    );
};

const advertGetAll = async(req, res) => {
    try {
        const advert = await Advert.find().populate("advert");
        const { error, pageList, page, pageSize } = await pagination(advert, req);
        if (error) {
            return errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        const data = await advertCard(res, pageList);
        successResponse(res, statusCode.OK, {
            data,
            currentPage: page,
            totalPage: Math.ceil(advert.length / pageSize),
        });
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const advertGetByCategory = async(req, res) => {
    try {
        const advert = await Advert.find().populate("advert");
        var regex = new RegExp(`\^${req.params.categoryPath}`);
        var result = advert.filter((item) => item.advert.categoryPath.match(regex));
        const { error, pageList, page, pageSize } = await pagination(result, req);
        if (error) {
            return errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        const data = await advertCard(res, pageList);
        successResponse(res, statusCode.OK, {
            data,
            currentPage: page,
            totalPage: Math.ceil(result.length / pageSize),
        });
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const advertGetByUser = async(req, res) => {
    try {
        const advert = await Advert.find().populate("advert");
        var result = advert.filter(
            (item) => item.advert.user._id.toString() === req.userId
        );
        const { error, pageList, page, pageSize } = await pagination(result, req);
        if (error) {
            return errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        const data = await advertCard(res, pageList);
        successResponse(res, statusCode.OK, {
            data,
            currentPage: page,
            totalPage: Math.ceil(result.length / pageSize),
        });
    } catch (error) {
        console.log(error);
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

const advertCard = async(res, array) => {
    try {
        var data = [];
        array.map((item) => {
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
        return data;
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
    advertGetByUser,
};