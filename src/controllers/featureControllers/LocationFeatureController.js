const genericController = require("../GenericController");
const LocationFeature = require("../../models/featureModels/LocationFeature");

const locationPost = async(req, res) => {
    await genericController.genericPost(req, res, LocationFeature);
};

const locationUpdate = async(req, res) => {
    await genericController.genericUpdate(
        req.params.id,
        req.body,
        res,
        LocationFeature
    );
};

const locationGet = async(req, res) => {
    await genericController.genericGet(req, res, LocationFeature);
};

module.exports = {
    locationPost,
    locationUpdate,
    locationGet,
};