const statusCode = require("http-status-codes").StatusCodes;
const errorResponse = require("../responses/error-response");
const successResponse = require("../responses/success-response");
const City = require("../models/addresses/city");
const District = require("../models/addresses/district");
const Town = require("../models/addresses/town");
const genericController = require("./generic");

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