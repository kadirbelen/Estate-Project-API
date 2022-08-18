const genericController = require("../GenericController");
const ExternalFeature = require("../../models/featureModels/ExternalFeature");

const externalPost = async(req, res) => {
    await genericController.genericPost(req, res, ExternalFeature);
};

const externalUpdate = async(req, res) => {
    await genericController.genericUpdate(req, res, ExternalFeature);
};

const externalGet = async(req, res) => {
    await genericController.genericGet(req, res, ExternalFeature);
};

module.exports = {
    externalPost,
    externalUpdate,
    externalGet,
};