const genericController = require("../GenericController");
const InteriorFeature = require("../../models/featureModels/InteriorFeature");

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

const interiorGet = async(req, res) => {
    await genericController.genericGet(req, res, InteriorFeature);
};

module.exports = {
    interiorPost,
    interiorUpdate,
    interiorGet,
};