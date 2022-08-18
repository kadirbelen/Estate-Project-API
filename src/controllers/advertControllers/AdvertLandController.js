const AdvertLand = require("../../models/advertModels/AdvertLand");
const Category = require("../../models/Category");
const genericController = require("../GenericController");

const advertLandPost = async(req, res) => {
    await genericController.genericAdvertPost(req, res, AdvertLand);
};

const advertLandUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, AdvertLand);
};

const advertLandDelete = async(req, res) => {
    await genericController.genericDelete(req, res);
};

const advertLandGetByCategory = async(req, res) => {
    await genericController.genericGetByQuery(req, res, AdvertLand, {
        categoryPath: { $regex: `\^${req.params.categoryPath}` },
    });
};

const advertLandGetById = async(req, res) => {
    await genericController.genericGetByQueryPopulate(
        req,
        res,
        AdvertLand, { _id: req.params.id }, ["locationFeatures", "address.city", "address.district", "address.town"]
    );
};

module.exports = {
    advertLandPost,
    advertLandUpdate,
    advertLandDelete,
    advertLandGetByCategory,
    advertLandGetById,
};