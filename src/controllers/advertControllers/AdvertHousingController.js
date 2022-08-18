const AdvertHousing = require("../../models/advertModels/AdvertHousing").model;
const genericController = require("../GenericController");
const errorResponse = require("../../responses/errorResponse");
const successResponse = require("../../responses/successResponse");
const statusCode = require("http-status-codes").StatusCodes;
// var fs = require("fs");
// const multer = require("../../multerConfig");
// const upload = multer.array("images", 5);

// const uploadImage = async(req, res) => {
//     upload(req, res, async(err) => {
//         if (err) {
//             errorResponse(res, statusCode.BAD_REQUEST, err.message);
//         }
//         const images = [];
//         for (let i = 0; i < req.files.length; i++) {
//             images.push({ path: req.files[i].path });
//         }
//         return images;
//     });
// };

const advertHousingPost = async(req, res) => {
    await genericController.genericAdvertPost(req, res, AdvertHousing);
};

const advertHousingUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, AdvertHousing);
};

const advertHousingDelete = async(req, res) => {
    await genericController.genericDelete(req, res);
};

const advertHousingGetByCategory = async(req, res) => {
    await genericController.genericGetByQuery(req, res, AdvertHousing, {
        categoryPath: { $regex: `\^${req.params.categoryPath}` },
    });
};

const advertHousingGetById = async(req, res) => {
    await genericController.genericGetByQueryPopulate(
        req,
        res,
        AdvertHousing, { _id: req.params.id }, [
            "interiorFeatures",
            "externalFeatures",
            "locationFeatures",
            "address.city",
            "address.district",
            "address.town",
        ]
    );
};

module.exports = {
    advertHousingPost,
    advertHousingUpdate,
    advertHousingDelete,
    advertHousingGetByCategory,
    advertHousingGetById,
};