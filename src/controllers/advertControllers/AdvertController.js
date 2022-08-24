const errorResponse = require("../../responses/errorResponse");
const successResponse = require("../../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
const Advert = require("../../models/advertModels/Advert");
const genericController = require("../GenericController");
const mongoose = require("mongoose");
const ImageTemporary = require("../../models/ImageTemporary");
const driveService = require("../../services/googleDriveService");

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
        await Advert.findByIdAndRemove(advert._id);
        successResponse(res, statusCode.OK, "İlan silindi");
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};
// .populate({
//     path: "advert",
//     populate: {
//         path: "address",
//         populate: [{
//                 path: "city",
//             },
//             {
//                 path: "district",
//             },
//             {
//                 path: "town",
//             },
//         ],
//     },
// });
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
        successResponse(res, statusCode.OK, advert);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const advertImagePost = async(req, res) => {
    try {
        const image = await driveService.publicUrl(req, res);
        const temporary = new ImageTemporary(image);
        temporary.save();
        successResponse(res, statusCode.OK, { remoteId: temporary.remoteId });
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const advertImageDelete = async(req, res) => {
    try {
        console.log("idi", req.params.remoteId);
        await driveService.deleteFile(req, res);
        await ImageTemporary.findOneAndRemove({
            remoteId: req.params.remoteId,
        });
        successResponse(res, statusCode.OK);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = {
    advertGetById,
    advertGetAll,
    advertUpdate,
    advertDelete,
    advertImagePost,
    advertImageDelete,
};