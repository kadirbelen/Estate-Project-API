const AdvertHousing = require("../../models/advertModels/AdvertHousing").model;
const genericController = require("../GenericController");

const advertHousingPost = async(req, res) => {
    await genericController.genericAdvertPost(
        req,
        res,
        AdvertHousing,
        "AdvertHousing",
        "Konut"
    );
};

const advertHousingGetByCategory = async(req, res) => {
    await genericController.genericGetByQuery(req, res, AdvertHousing, {
        categoryPath: { $regex: `\^${req.params.categoryPath}` },
    });
};

module.exports = {
    advertHousingPost,
    advertHousingGetByCategory,
};