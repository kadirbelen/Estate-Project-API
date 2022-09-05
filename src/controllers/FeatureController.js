const genericController = require("./GenericController");
const ExternalFeature = require("../models/featureModels/ExternalFeature");
const InteriorFeature = require("../models/featureModels/InteriorFeature");
const LocationFeature = require("../models/featureModels/LocationFeature");

const externalPost = async(req, res) => {
    await genericController.genericPost(req, res, ExternalFeature);
};

const externalUpdate = async(req, res) => {
    await genericController.genericUpdate(
        req.params.id,
        req.body,
        res,
        ExternalFeature
    );
};

const externalGet = async(req, res) => {
    await genericController.genericGet(res, ExternalFeature);
};

const interiorPost = async(req, res) => {
    await genericController.genericPost(req, res, InteriorFeature);
};

const interiorUpdate = async(req, res) => {
    await genericController.genericUpdate(
        req.params.id,
        req.body,
        res,
        InteriorFeature
    );
};

const interiorGet = async(res) => {
    await genericController.genericGet(res, InteriorFeature);
};

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
    await genericController.genericGet(res, LocationFeature);
};

module.exports = {
    interiorPost,
    interiorUpdate,
    interiorGet,
    externalGet,
    externalPost,
    externalUpdate,
    locationGet,
    locationPost,
    locationUpdate
};