const Advert = require("../models/Advert");
const AdvertFeature = require("../models/AdvertFeature");
const genericController = require("./GenericController");
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/succesResponse");
const statusCode = require("http-status-codes").StatusCodes;

const advertPost = async(req, res) => {
    try {
        const advertFeature = await AdvertFeature(req.body.properties);
        const advert = new Advert({...req.body, properties: advertFeature._id });
        await advertFeature.save();
        await advert.save();
        successResponse(res, statusCode.OK, advert);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const advertUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, Advert);
};

const advertDelete = async(req, res) => {
    await genericController.genericDelete(req, res);
};

const advertGetByCategory = async(req, res) => {
    try {
        console.log("id:", req.params.id);
        const advert = await Advert.find({
            categoryPath: { $regex: `\^${req.params.id}` },
        }).populate("properties");
        successResponse(res, statusCode.OK, advert);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = {
    advertPost,
    advertUpdate,
    advertDelete,
    advertGetByCategory,
};