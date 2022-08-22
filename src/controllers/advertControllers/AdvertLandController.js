const AdvertLand = require("../../models/advertModels/AdvertLand");
const genericController = require("../GenericController");

const advertLandPost = async(req, res) => {
    await genericController.genericAdvertPost(
        req,
        res,
        AdvertLand,
        "AdvertLand",
        "Arsa"
    );
};

const advertLandGetByCategory = async(req, res) => {
    await genericController.genericGetByQuery(req, res, AdvertLand, {
        categoryPath: { $regex: `\^${req.params.categoryPath}` },
    });
};

module.exports = {
    advertLandPost,
    advertLandGetByCategory,
};