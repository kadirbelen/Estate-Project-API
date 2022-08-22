const AdvertWorkPlace = require("../../models/advertModels/AdvertWorkPlace");
const Category = require("../../models/Category");
const genericController = require("../GenericController");

const advertWorkPlacePost = async(req, res) => {
    await genericController.genericAdvertPost(
        req,
        res,
        AdvertWorkPlace,
        "AdvertWorkPlace",
        "İş Yeri"
    );
};

const advertWorkPlaceGetByCategory = async(req, res) => {
    await genericController.genericGetByQuery(req, res, AdvertWorkPlace, {
        categoryPath: { $regex: `\^${req.params.categoryPath}` },
    });
};

module.exports = {
    advertWorkPlacePost,
    advertWorkPlaceGetByCategory,
};