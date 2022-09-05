const City = require("../models/addressModels/City");
const District = require("../models/addressModels/District");
const Town = require("../models/addressModels/Town");
const statusCode = require("http-status-codes").StatusCodes;
const errorResponse = require("../responses/errorResponse");
const successResponse = require("../responses/successResponse");
const genericController = require("./GenericController");

const getCity = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericGet(City);
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const getDistrictByCity = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericGetByQuery(District, {
            city: req.params.cityId,
        });
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

const getTownByDistrict = async(req, res) => {
    try {
        const { error, newModel } = await genericController.genericGetByQuery(Town, {
            district: req.params.districtId,
        });
        if (error) {
            errorResponse(res, statusCode.BAD_REQUEST, error.message);
        }
        successResponse(res, statusCode.OK, newModel);
    } catch (error) {
        errorResponse(res, statusCode.BAD_REQUEST, error.message);
    }
};

module.exports = { getCity, getDistrictByCity, getTownByDistrict };