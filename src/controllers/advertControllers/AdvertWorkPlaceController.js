const AdvertWorkPlace = require("../../models/advertModels/AdvertWorkPlace");
const Category = require("../../models/Category");
const genericController = require("../GenericController");

const advertWorkPlacePost = async(req, res) => {
    await genericController.genericAdvertPost(req, res, AdvertWorkPlace);
};

const advertWorkPlaceUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, AdvertWorkPlace);
};

const advertWorkPlaceDelete = async(req, res) => {
    await genericController.genericDelete(req, res);
};

const advertWorkPlaceGetByCategory = async(req, res) => {
    await genericController.genericGetByQuery(req, res, AdvertWorkPlace, {
        categoryPath: { $regex: `\^${req.params.categoryPath}` },
    });
};

const advertWorkPlaceGetById = async(req, res) => {
    await genericController.genericGetByQueryPopulate(
        req,
        res,
        AdvertWorkPlace, { _id: req.params.id }, [
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
    advertWorkPlacePost,
    advertWorkPlaceUpdate,
    advertWorkPlaceDelete,
    advertWorkPlaceGetByCategory,
    advertWorkPlaceGetById,
};