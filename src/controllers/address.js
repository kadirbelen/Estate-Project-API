const statusCode = require("http-status-codes").StatusCodes;
const ApiError = require("../responses/error-response");
const successResponse = require("../responses/success-response");
const City = require("../models/addresses/city");
const District = require("../models/addresses/district");
const Town = require("../models/addresses/town");
const genericController = require("./generic");

const getCity = async (req, res, next) => {
    try {
        const data = await genericController.genericGet(City);

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const getDistrictByCity = async (req, res, next) => {
    try {
        const data = await genericController.genericGetByQuery(District, {
            city: req.params.cityId,
        });

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

const getTownByDistrict = async (req, res, next) => {
    try {
        const data = await genericController.genericGetByQuery(Town, {
            district: req.params.districtId,
        });

        successResponse(res, statusCode.OK, data);
    } catch (error) {
        return next(new ApiError(error.message, statusCode.BAD_REQUEST));
    }
};

module.exports = { getCity, getDistrictByCity, getTownByDistrict };
