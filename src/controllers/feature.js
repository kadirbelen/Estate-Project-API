const statusCode = require("http-status-codes").StatusCodes;
const ApiError = require("../responses/error-response");
const successResponse = require("../responses/success-response");
const ExternalFeature = require("../models/features/external");
const InteriorFeature = require("../models/features/interior");
const LocationFeature = require("../models/features/location");
const genericController = require("./generic");

const externalPost = async (req, res, next) => {
    try {
        const data = await genericController.genericPost(req.body, ExternalFeature);
        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const externalUpdate = async (req, res, next) => {
    try {
        const data = await genericController.genericUpdate(
            req.params.id,
            req.body,
            ExternalFeature
        );

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const externalGet = async (req, res, next) => {
    try {
        const data = await genericController.genericGet(ExternalFeature);

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const interiorPost = async (req, res, next) => {
    try {
        const data = await genericController.genericPost(req.body, InteriorFeature);

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const interiorUpdate = async (req, res, next) => {
    try {
        const data = await genericController.genericUpdate(
            req.params.id,
            req.body,
            InteriorFeature
        );

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const interiorGet = async (req, res, next) => {
    try {
        const data = await genericController.genericGet(InteriorFeature);

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const locationPost = async (req, res, next) => {
    try {
        const data = await genericController.genericPost(req.body, LocationFeature);

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const locationUpdate = async (req, res, next) => {
    try {
        const data = await genericController.genericUpdate(
            req.params.id,
            req.body,
            LocationFeature
        );

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const locationGet = async (req, res, next) => {
    try {
        const data = await genericController.genericGet(LocationFeature);
        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
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
