const statusCode = require("http-status-codes").StatusCodes;
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const genericController = require("./GenericController");
const ExternalFeature = require("../models/featureModels/ExternalFeature");
const InteriorFeature = require("../models/featureModels/InteriorFeature");
const LocationFeature = require("../models/featureModels/LocationFeature");

const externalPost = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericPost(
            req,
            ExternalFeature
        );
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const externalUpdate = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericUpdate(
            req.params.id,
            req.body,
            ExternalFeature
        );
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const externalGet = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericGet(ExternalFeature);
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const interiorPost = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericPost(
            req,
            InteriorFeature
        );
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const interiorUpdate = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericUpdate(
            req.params.id,
            req.body,
            InteriorFeature
        );
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const interiorGet = async(res) => {
    try {
        const { error, newModel } = await genericController.genericGet(InteriorFeature);
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const locationPost = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericPost(
            req,
            LocationFeature
        );
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const locationUpdate = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericUpdate(
            req.params.id,
            req.body,
            LocationFeature
        );
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const locationGet = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericGet(LocationFeature);
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
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
    locationUpdate,
};